from playwright.sync_api import sync_playwright
import time

def analyze_live_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        # Visit the live Vercel deployment
        print("🌐 Visiting live Vercel deployment...")
        page.goto("https://disaster-recovery-git-dr-new-unite-group.vercel.app/", wait_until="networkidle")

        # Take a screenshot of the homepage
        page.screenshot(path="live_site_homepage.png")
        print("📸 Screenshot saved: live_site_homepage.png")

        # Check for key elements
        print("\n🔍 Analyzing key elements on live site:")

        # Check for Phill McGurk name
        phill_elements = page.locator('text=/Phill McGurk/i').count()
        print(f"✓ 'Phill McGurk' mentions found: {phill_elements}")

        # Check for Master Restorer claims
        master_restorer = page.locator('text=/Master Restorer/i').count()
        print(f"✓ 'Master Restorer' mentions found: {master_restorer}")

        # Check for CRM references
        crm_references = page.locator('text=/CRM/').count()
        print(f"✓ 'CRM' references found: {crm_references}")

        # Check for NRP references
        nrp_references = page.locator('text=/NRP/').count()
        print(f"✓ 'NRP' references found: {nrp_references}")

        # Check navigation menu items
        print("\n📋 Navigation Menu Items:")
        nav_links = page.locator('nav a').all()
        for link in nav_links[:10]:  # First 10 nav items
            text = link.inner_text().strip()
            if text:
                print(f"  - {text}")

        # Check for location mentions
        print("\n📍 Location References:")
        brisbane = page.locator('text=/Brisbane/i').count()
        ipswich = page.locator('text=/Ipswich/i').count()
        logan = page.locator('text=/Logan/i').count()
        print(f"  - Brisbane: {brisbane} mentions")
        print(f"  - Ipswich: {ipswich} mentions")
        print(f"  - Logan: {logan} mentions")

        # Check page title
        title = page.title()
        print(f"\n📄 Page Title: {title}")

        # Check for services
        print("\n🛠️ Services Found:")
        services = ["Water Damage", "Fire Damage", "Mould", "Storm", "Commercial"]
        for service in services:
            count = page.locator(f'text=/{service}/i').count()
            if count > 0:
                print(f"  ✓ {service}: {count} mentions")

        # Visit a few key pages if they exist
        print("\n📑 Checking Key Pages:")
        pages_to_check = [
            "/services",
            "/about",
            "/contact",
            "/crm",
            "/pitch",
            "/services/commercial"
        ]

        for path in pages_to_check:
            try:
                response = page.goto(f"https://disaster-recovery-git-dr-new-unite-group.vercel.app{path}", wait_until="domcontentloaded", timeout=5000)
                if response and response.status == 200:
                    print(f"  ✓ {path} - EXISTS (200)")
                else:
                    print(f"  ✗ {path} - {response.status if response else 'NO RESPONSE'}")
            except:
                print(f"  ✗ {path} - NOT FOUND or ERROR")

        # Wait a moment before closing
        time.sleep(2)
        browser.close()
        print("\n✅ Analysis complete!")

if __name__ == "__main__":
    analyze_live_site()