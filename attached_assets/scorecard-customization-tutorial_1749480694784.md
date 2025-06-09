# Dynamic Investment Scorecard Customization Tutorial

## Overview
This guide shows you how to transform your static M31 investment scorecard into a dynamic, multi-configuration system that supports different weighting schemes, multiple investments, and easy customization.

## Part 1: Setting Up Dynamic Weight Configurations

### Step 1: Create Configuration Reference Table
1. Add a new section to your sheet (columns G-L recommended)
2. Create headers: `Configuration Name | Team | Technology | Market | Blockchain | Business | Risk`
3. Add your different weight configurations:

```
Conservative VC    | 30% | 15% | 25% | 10% | 15% | 5%
Growth-Focused VC  | 20% | 25% | 30% | 5%  | 15% | 5%
Blockchain-First   | 20% | 30% | 15% | 25% | 8%  | 2%
Early-Stage VC     | 35% | 20% | 20% | 5%  | 15% | 5%
```

### Step 2: Add Configuration Selector
1. In cell B1, add label: "Investment Approach:"
2. In cell C1, create dropdown using Data Validation:
   - Go to Data → Data Validation
   - Choose "List from a range"
   - Select your configuration names (G2:G6)
   - Check "Show dropdown list in cell"

### Step 3: Dynamic Weight Formulas
Replace your static weight percentages with dynamic formulas:

**For Team Weight (25%):**
```
=INDEX($H$2:$L$6,MATCH($C$1,$G$2:$G$6,0),2)
```

**For Technology Weight (20%):**
```
=INDEX($H$2:$L$6,MATCH($C$1,$G$2:$G$6,0),3)
```

Continue this pattern for all categories, adjusting the column number (2,3,4,5,6,7).

## Part 2: Creating Multiple Investment Tabs

### Method 1: Manual Tab Creation
1. Right-click your current scorecard tab
2. Select "Duplicate"
3. Rename to "Template - Do Not Edit"
4. Create new tabs for each investment:
   - "Investment - [Company Name]"
   - Example: "Investment - TechCorp", "Investment - BlockchainCo"

### Method 2: Automated Tab Creation (Advanced)
1. Install "Template Tab" add-on from Google Workspace Marketplace
2. Create a list of company names in a separate sheet
3. Use Template Tab to generate multiple scorecards automatically

### Best Practices for Tab Organization:
- Keep "Template" tab as master reference
- Use consistent naming: "Investment - [CompanyName]"
- Color-code tabs by investment stage or sector
- Protect template tab from accidental edits

## Part 3: Adding Customization Options

### Category Modification
To add/remove categories:

1. **Adding New Category:**
   - Insert new rows in your scorecard
   - Add subcategories with scoring dropdowns
   - Update weight configuration table
   - Adjust INDEX formulas to include new column

2. **Modifying Existing Categories:**
   - Edit subcategory names directly
   - Update descriptions in reference sheet
   - Modify scoring criteria as needed

### Subcategory Customization
1. **Add Subcategories:**
   - Insert rows within category section
   - Copy scoring dropdown from existing subcategory
   - Update category average formula range

2. **Remove Subcategories:**
   - Delete unwanted rows
   - Update AVERAGE formula range for category

## Part 4: Comparison Dashboard Setup

### Create Summary Sheet
1. Add new tab: "Portfolio Comparison"
2. Create summary table with columns:
   - Company Name
   - Investment Approach Used
   - Total Score
   - Decision Recommendation
   - Investment Date
   - Notes

### Summary Formulas
Pull data from individual investment tabs:

**Total Score:**
```
=INDIRECT("'Investment - " & A2 & "'!E26")
```

**Investment Approach:**
```
=INDIRECT("'Investment - " & A2 & "'!C1")
```

**Decision Recommendation:**
```
=IF(C2>=80,"Strong Buy",IF(C2>=60,"Consider",IF(C2>=40,"Hold","Pass")))
```

## Part 5: Advanced Customization Features

### Conditional Formatting for Visual Impact
1. Select score columns
2. Format → Conditional Formatting
3. Set color scales:
   - Red (0-40): Pass
   - Yellow (40-60): Hold  
   - Light Green (60-80): Consider
   - Dark Green (80-100): Strong Buy

### Data Validation for Consistency
1. **Score Dropdowns:** Ensure all scores use 0-5 scale
2. **Text Fields:** Create dropdowns for common entries
3. **Date Fields:** Restrict to valid date ranges

### Protection and Access Control
1. **Protect Template:** Right-click → Protect Sheet
2. **Limit Editing:** Set permissions for team members
3. **Version Control:** Use Google Sheets version history

## Part 6: Maintenance and Updates

### Regular Updates
- Review weight configurations quarterly
- Update subcategory definitions based on market changes
- Archive completed investments to separate folder

### Backup Strategy
- Duplicate entire spreadsheet monthly
- Export key data to CSV files
- Maintain offline backup of formulas and structure

## Formula Reference Quick Guide

### Essential Dynamic Formulas
```
Weight Lookup: =INDEX(WeightTable,MATCH(Config,ConfigNames,0),ColNum)
Weighted Score: =CategoryScore * DynamicWeight
Cross-Tab Reference: ='TabName'!CellAddress
Conditional Display: =IF(condition, value_if_true, value_if_false)
```

### Troubleshooting Common Issues
- **#REF! Errors:** Check tab names and cell references
- **Circular References:** Ensure formulas don't reference themselves
- **Weight Sum ≠ 100%:** Verify configuration table adds to 100%
- **Dropdown Not Working:** Check data validation range settings

## Implementation Checklist

- [ ] Configuration reference table created
- [ ] Dynamic weight formulas implemented
- [ ] Multiple investment tabs set up
- [ ] Comparison dashboard built
- [ ] Data validation rules applied
- [ ] Conditional formatting added
- [ ] Protection settings configured
- [ ] Team training completed
- [ ] Backup system established
- [ ] Documentation updated

## Next Steps
1. Test the system with sample data
2. Train team members on new features
3. Gather feedback and iterate
4. Scale to additional investment criteria as needed

This dynamic system transforms your static scorecard into a powerful, flexible investment evaluation tool that grows with your needs.