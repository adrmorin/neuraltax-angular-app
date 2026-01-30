---
name: form1040aC
description: A specialized skill for handling the Form 1040 Schedule C (Business Profit/Loss) data entry and calculations including COGS, Vehicle Info, and Other Expenses.
---

# form1040aC Skill

This skill manages the complex data entry for the U.S. Individual Income Tax Return - Schedule C (Profit or Loss From Business).

## Data Structure

The skill manages five primary parts:

### 1. Business Info & Income (Parte I)

- Box 1: Gross receipts or sales
- Box 4: Cost of goods sold (Linked to Parte III, Line 42)
- Box 7: Gross Income (Calculated)

### 2. Business Expenses (Parte II)

- Box 8-27: Detailed expense categories.
- Box 28: Total Expenses (Calculated)
- Box 31: Net Profit or Loss (Calculated)

### 3. Cost of Goods Sold (Parte III)

- Box 35: Inventory at beginning of year
- Box 36: Purchases
- Box 37: Cost of labor
- Box 38: Materials and supplies
- Box 39: Other costs
- Box 40: Sum of lines 35-39 (Calculated)
- Box 41: Inventory at end of year
- Box 42: Cost of goods sold (Line 40 minus Line 41) -> Feeds Parte I, Line 4.

### 4. Vehicle Information (Parte IV)

- Line 43: Date placed in service
- Line 44: Mileage (Business/Commuting/Other)
- Line 45-47: Evidence and usage questions (Yes/No)

### 5. Other Expenses (Parte V)

- Itemized list of business expenses not covered in Parte II.
- Box 48: Total other expenses (Calculated) -> Feeds Parte II, Line 27a.

## Calculation Engine

- **COGS**: `(Line 35 + 36 + 37 + 38 + 39) - Line 41 = Line 42`
- **Gross Income**: `Line 1 - Line 2 - Line 4 + Line 6 = Line 7`
- **Net Profit**: `Line 7 - Line 28 - Line 30 = Line 31`
