# Equipment Manufacturer Audit for Training Images

**Date:** 2026-02-06
**Purpose:** Ensure all training images accurately represent industry equipment based on official manufacturer specifications

---

## Manufacturer Research Summary

### 1. Dehumidifiers

| Manufacturer | Model Series | Housing Colour | Material | Source |
|--------------|--------------|----------------|----------|--------|
| **Dri-Eaz** | Revolution LGR, LGR 6000Li, LGR 7000XLi | **BLUE** | Rotomolded polyethylene | dri-eaz.com, sylvane.com |
| **Phoenix** | R250, DryMAX XL, DryMAX XL Pro | **BLUE** or **RED** | Rotomolded polyethylene | usephoenix.com, aramsco.com |
| **XPOWER** | Various portable | Various (commonly blue) | ABS plastic | xpower.com |
| **BlueDri** | BD-76 series | **BLUE** | Rotomolded | bluedri.com |

### 2. Air Movers / Blowers

| Manufacturer | Model Series | Housing Colour | CFM Rating | Source |
|--------------|--------------|----------------|------------|--------|
| **Dri-Eaz** | Sahara Pro X3, Ace | **BLUE** | 2900-3000 CFM | dri-eaz.com |
| **XPOWER** | P-830, X-600A, P-80 | **BLUE** (also orange, green available) | 600-3600 CFM | xpower.com |
| **Phoenix** | AirMAX, Focus II | **BLUE** or **RED** | Various | usephoenix.com |
| **BlueDri** | One-29 | **BLUE** | 2900 CFM | bluedri.com |

### 3. HEPA Air Scrubbers / Negative Air Machines

| Manufacturer | Model Series | Housing Colour | Material | Source |
|--------------|--------------|----------------|----------|--------|
| **Abatement Technologies** | HEPA-AIRE H2KM, H2KMA | **GALVANIZED STEEL** (silver/grey) | 20 gauge galvanized steel | abatement.com |
| **Phoenix** | Guardian R HEPA | **BLUE** or **RED** rotomold | Rotomolded polyethylene | usephoenix.com |
| **Dri-Eaz** | DefendAir HEPA 500 | **BLUE** | Rotomolded | dri-eaz.com |

### 4. Thermal Imaging Cameras

| Manufacturer | Model Series | Housing Colour | Key Features | Source |
|--------------|--------------|----------------|--------------|--------|
| **FLIR** | MR265, MR176, MR277 | **BLACK** with grey accents | Moisture meter + thermal | flir.com |
| **FLIR** | E-Series, C-Series | **BLACK/GREY** with yellow accents | Standalone thermal | flir.com |

### 5. Moisture Meters

| Manufacturer | Model Series | Housing Colour | Type | Source |
|--------------|--------------|----------------|------|--------|
| **Tramex** | ME5, MEX5, CMEX5 | **YELLOW/GREEN** with black | Pinless | tramexmeters.com |
| **Delmhorst** | BD-2100, Navigator Pro | **GREY/BLACK** | Pin and pinless | delmhorst.com |
| **Protimeter** | Surveymaster, MMS3 | **ORANGE/BLACK** | Pin and pinless | protimeter.com |
| **FLIR** | MR77L, MR160 | **BLACK/GREY** | Pin and pinless with thermal | flir.com |

### 6. Hydroxyl Generators / Ozone Equipment

| Manufacturer | Model Series | Housing Colour | Material | Source |
|--------------|--------------|----------------|----------|--------|
| **International Ozone (Titan)** | Titan 1000, 2000 MAX | **SILVER/GREY** metal | Powder-coated steel | internationalozone.com |
| **Queenaire** | Various | **BLACK** housing | Metal/plastic | queenaire.com |

### 7. Specialty Drying Equipment

| Manufacturer | Model Series | Housing Colour | Key Visual | Source |
|--------------|--------------|----------------|------------|--------|
| **Injectidry** | HP60, HP100 | **GREY** rotomold | **SAFETY YELLOW** hoses | injectidry.com |
| **Dri-Eaz** | InterAir Drying System | **BLUE** manifold | Blue hoses | dri-eaz.com |
| **Phoenix** | Various wall drying | **BLUE/RED** | Blue/red tubing | usephoenix.com |

### 8. Carpet Cleaning / Extraction Equipment

| Manufacturer | Model Series | Housing Colour | Type | Source |
|--------------|--------------|----------------|------|--------|
| **Prochem** | Apex GTX, Peak 500, Everest | Various (mounted in vans) | Truck-mount | prochem.co.uk |
| **Sapphire Scientific** | 370SS, 570 | Chrome/stainless | Truck-mount | sapphirescientific.com |
| **HydraMaster** | Titan series | Chrome/stainless | Truck-mount | hydramaster.com |

---

## Images Requiring Manufacturer-Accurate Updates

### Priority 1: COMPLETED
| Module | Image | Equipment | Status |
|--------|-------|-----------|--------|
| NRP-016 | advanced-drying-techniques.jpg | Injectidry HP60 | ✅ Fixed - SAFETY YELLOW hoses |

### Priority 2: Equipment-Specific Images

| Module | Image | Equipment Shown | Current Prompt Issue | Recommended Fix |
|--------|-------|-----------------|---------------------|-----------------|
| NRP-002 | moisture-testing-equipment.jpg | Moisture meters, thermal cameras | Generic description | Add specific colours: Tramex YELLOW/GREEN, FLIR BLACK, Protimeter ORANGE |
| NRP-006 | dehumidification-equipment.jpg | LGR dehumidifiers, air movers | Generic description | Specify Dri-Eaz BLUE, Phoenix BLUE/RED |
| NRP-007 | hepa-filtration-equipment.jpg | HEPA air scrubbers | Generic description | Specify Abatement GALVANIZED STEEL, Dri-Eaz BLUE |
| NRP-008 | air-scrubber-operation.jpg | Air scrubbers, thermal foggers | Generic description | Add specific equipment colours |
| NRP-011 | carpet-cleaning-equipment.jpg | Truck-mount extractor | Generic description | Add truck-mount specifications |
| NRP-013 | odour-control-equipment.jpg | Hydroxyl/ozone generators | Generic description | Specify Titan SILVER/GREY housing |
| NRP-015 | equipment-fleet-overview.jpg | Complete equipment array | Generic description | Add comprehensive colour specifications |
| NRP-016 | thermal-imaging-analysis.jpg | FLIR thermal camera | Generic description | Specify FLIR BLACK housing, colour palette |

---

## Updated Prompt Specifications

### NRP-002: Moisture Testing Equipment
```
EQUIPMENT COLOURS (MANUFACTURER-VERIFIED):
- Tramex moisture meters: YELLOW/GREEN housing with black buttons
- FLIR thermal cameras: BLACK housing with grey accents
- Protimeter meters: ORANGE/BLACK housing
- Pin probes: typically silver metal with black handles
```

### NRP-006: Dehumidification Equipment
```
EQUIPMENT COLOURS (MANUFACTURER-VERIFIED):
- Dri-Eaz LGR dehumidifiers: BLUE rotomolded polyethylene housing
- Phoenix dehumidifiers: BLUE or RED rotomolded housing
- Air movers: BLUE (Dri-Eaz, XPOWER) or ORANGE (various)
- All units have black wheels and handles
```

### NRP-007: HEPA Filtration Equipment
```
EQUIPMENT COLOURS (MANUFACTURER-VERIFIED):
- Abatement Technologies HEPA-AIRE: GALVANIZED STEEL (silver/grey metal)
- Dri-Eaz HEPA scrubbers: BLUE rotomolded housing
- Phoenix Guardian R: BLUE or RED rotomolded housing
- Negative air ducting: typically WHITE flexible duct
```

### NRP-013: Odour Control Equipment
```
EQUIPMENT COLOURS (MANUFACTURER-VERIFIED):
- International Ozone Titan hydroxyl generators: SILVER/GREY powder-coated steel
- Queenaire ozone generators: BLACK housing
- Thermal foggers: typically SILVER/CHROME metal body
- Air scrubbers: BLUE (Dri-Eaz) or GALVANIZED STEEL (Abatement)
```

### NRP-016: Thermal Imaging Analysis
```
EQUIPMENT COLOURS (MANUFACTURER-VERIFIED):
- FLIR thermal cameras: BLACK housing with grey/orange accents
- Display shows thermal palette: Iron (orange/yellow/purple), Rainbow, or Arctic
- Moisture readings overlay in thermal image
- BLACK tripod mount typical
```

---

## Visual QA Checklist for Equipment Images

When generating or reviewing equipment images, verify:

- [ ] Equipment colours match manufacturer specifications
- [ ] Housing materials appear correct (rotomolded plastic vs metal)
- [ ] Brand-neutral (no visible logos, but correct equipment appearance)
- [ ] Hoses/ducting colours match equipment manufacturer standards
- [ ] Australian context maintained (power outlets, settings)
- [ ] Professional quality and realistic connections

---

*Document created: 2026-02-06*
*Last updated: 2026-02-06*
