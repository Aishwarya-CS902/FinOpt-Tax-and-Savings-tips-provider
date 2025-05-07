# utils/tax_calculator.py

def calculate_tax(ctc: float) -> float:
    """
    Calculates tax based on the new regime for FY 2025-26.

    Args:
        ctc (float): Annual CTC in INR

    Returns:
        tax (float): Tax payable based on slabs
    """

    if ctc <= 12_00_000:
        return 0.0
    elif ctc <= 16_00_000:
        taxable_amount = ctc - 12_00_000
        tax = 0.15 * taxable_amount
    elif ctc <= 20_00_000:
        taxable_amount = ctc - 16_00_000
        tax = (0.15 * 4_00_000) + (0.20 * taxable_amount)
    elif ctc <= 24_00_000:
        taxable_amount = ctc - 20_00_000
        tax = (0.15 * 4_00_000) + (0.20 * 4_00_000) + (0.25 * taxable_amount)
    else:
        taxable_amount = ctc - 24_00_000
        tax = (0.15 * 4_00_000) + (0.20 * 4_00_000) + (0.25 * 4_00_000) + (0.30 * taxable_amount)

    return tax
