# Exact Values for Your Vercel "Add Environment Variable" Modal

Based on the screenshot of your Vercel screen, here is **exactly what to enter into each field**:

---

### Field-by-Field Breakdown

| Field in your Screenshot | What to Enter / Select |
| :--- | :--- |
| **Type** | Leave it on **Secret** (already selected with blue border) |
| **Key** | `VITE_WEB3FORMS_ACCESS_KEY` |
| **Value** | Paste your access key code |
| **Note (Optional)** | Leave blank (or type `Web3Forms email`) |
| **Environments** | Click the dropdown and select **Production, Preview, Development** |

---

### Step-by-Step Instructions

1. **In the Key box**: Type or paste:
   ```text
   VITE_WEB3FORMS_ACCESS_KEY
   ```
   *(Important: It must start with `VITE_` exactly as written so Vite builds it into your live website).*

2. **In the Value box**:
   Paste the access key code you got from Web3Forms.

3. **In the Environments dropdown**:
   Click it and check **Production**, **Preview**, and **Development** (this ensures it works in all deployments).

4. **Click Save**:
   Click the black **Save** button in the bottom-right corner.

5. **Trigger a Redeploy (Required to apply the key)**:
   - Click the **Deployments** tab at the top of your Vercel project.
   - Click the three dots (`...`) on the right side of the most recent deployment.
   - Click **Redeploy**.

---

### Result

Once the redeployment finishes:
- Submissions from `/contact` and the newsletter popup will automatically be routed directly into your Gmail (`williams.the.tech@gmail.com`).
- Your key remains 100% private inside Vercel and will **never appear on GitHub**.
