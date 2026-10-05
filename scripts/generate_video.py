import sys
import math
import random
import subprocess
import os

width, height = 320, 180
fps = 30
duration = 8  # 8-second seamless loop
total_frames = fps * duration

# Background base color: Deep Obsidian / Luxury Midnight Navy
bg_r, bg_g, bg_b = 7, 12, 24

# Seeded orbs for deterministic, beautiful layout
random.seed(1337)
num_orbs = 14
orbs = []
for i in range(num_orbs):
    # Colors: luxury ember gold, deep sapphire, warm cream
    palette = [
        (217, 119, 54, 0.45),  # Ember #D97736
        (245, 158, 11, 0.35),  # Warm Gold #F59E0B
        (235, 94, 40, 0.30),   # Bright Ember
        (30, 58, 110, 0.50),   # Deep Navy/Sapphire
        (59, 130, 246, 0.25),  # Soft Cyan Blue
    ]
    color = palette[i % len(palette)]
    
    orbs.append({
        'base_x': random.uniform(width * 0.1, width * 0.9),
        'base_y': random.uniform(height * 0.1, height * 0.9),
        'amp_x': random.uniform(25, 60),
        'amp_y': random.uniform(15, 40),
        'freq': random.choice([1, 2]),
        'phase': random.uniform(0, math.pi * 2),
        'radius': random.uniform(35, 75),
        'r': color[0],
        'g': color[1],
        'b': color[2],
        'intensity': color[3],
    })

# Micro particles (rising embers)
num_particles = 32
particles = []
for i in range(num_particles):
    particles.append({
        'x': random.uniform(0, width),
        'speed_y': random.uniform(15, 35),
        'freq_x': random.choice([1, 2, 3]),
        'amp_x': random.uniform(8, 20),
        'phase': random.uniform(0, math.pi * 2),
        'brightness': random.uniform(0.4, 0.9),
        'radius': random.uniform(1.2, 2.5),
    })

out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "videos")
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, "hero-background.mp4")

# ffmpeg pipeline: reads 320x180 raw rgb24, upscales to 1920x1080 with smooth lanczos,
# adds soft bloom blur, subtle vignette, and encodes optimized web-ready h264
ffmpeg_cmd = [
    "ffmpeg", "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{width}x{height}",
    "-pix_fmt", "rgb24",
    "-r", str(fps),
    "-i", "-",
    "-vf", "scale=1920:1080:flags=lanczos,gblur=sigma=4:steps=2",
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "22",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    out_file
]

proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

print(f"Generating {total_frames} frames ({duration}s loop) at {width}x{height}...")

# Precalculate grid coordinates
y_coords = list(range(height))
x_coords = list(range(width))

for frame_idx in range(total_frames):
    t_norm = frame_idx / total_frames
    angle = t_norm * 2.0 * math.pi
    
    # Initialize frame buffer with background color
    # Using bytearray for fast manipulation
    buf = bytearray([bg_r, bg_g, bg_b] * (width * height))
    
    # Render glowing orbs onto the buffer
    for orb in orbs:
        # Perfectly seamless sinusoidal trajectory
        cx = orb['base_x'] + orb['amp_x'] * math.cos(angle * orb['freq'] + orb['phase'])
        cy = orb['base_y'] + orb['amp_y'] * math.sin(angle * orb['freq'] + orb['phase'])
        rad = orb['radius']
        rad_sq = rad * rad
        
        # Bounding box
        min_x = max(0, int(cx - rad))
        max_x = min(width, int(cx + rad + 1))
        min_y = max(0, int(cy - rad))
        max_y = min(height, int(cy + rad + 1))
        
        o_r = orb['r']
        o_g = orb['g']
        o_b = orb['b']
        intensity = orb['intensity']
        
        for py in range(min_y, max_y):
            dy = py - cy
            dy_sq = dy * dy
            row_offset = py * width * 3
            
            for px in range(min_x, max_x):
                dx = px - cx
                dist_sq = dx * dx + dy_sq
                if dist_sq < rad_sq:
                    # Smooth hermite falloff: (1 - (d/r)^2)^2
                    factor = 1.0 - (dist_sq / rad_sq)
                    falloff = factor * factor * intensity
                    
                    idx = row_offset + px * 3
                    # Additive color blend with cap at 255
                    buf[idx] = min(255, int(buf[idx] + o_r * falloff))
                    buf[idx + 1] = min(255, int(buf[idx + 1] + o_g * falloff))
                    buf[idx + 2] = min(255, int(buf[idx + 2] + o_b * falloff))
                    
    # Render rising particles
    for p in particles:
        # Wrap vertical position seamlessly
        vert_prog = (t_norm * p['speed_y'] + p['phase']) % 1.0
        py = int((1.0 - vert_prog) * height)
        px = int(p['x'] + p['amp_x'] * math.sin(angle * p['freq_x'] + p['phase'])) % width
        
        br = p['brightness']
        # 3x3 soft star point
        for dy in (-1, 0, 1):
            target_y = py + dy
            if 0 <= target_y < height:
                row_off = target_y * width * 3
                for dx in (-1, 0, 1):
                    target_x = px + dx
                    if 0 <= target_x < width:
                        idx = row_off + target_x * 3
                        atten = 0.8 if (dx == 0 and dy == 0) else 0.35
                        buf[idx] = min(255, int(buf[idx] + 245 * br * atten))
                        buf[idx + 1] = min(255, int(buf[idx + 1] + 160 * br * atten))
                        buf[idx + 2] = min(255, int(buf[idx + 2] + 90 * br * atten))
                        
    proc.stdin.write(buf)

proc.stdin.close()
stdout, stderr = proc.communicate()
if proc.returncode == 0:
    size_mb = os.path.getsize(out_file) / (1024 * 1024)
    print(f"SUCCESS: Generated {out_file} ({size_mb:.2f} MB)")
else:
    print(f"ERROR: {stderr.decode('utf-8', errors='ignore')}")
