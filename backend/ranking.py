def calculate_score(
    total_amount,
    total_transactions
):
    consistency_bonus = min(
        total_transactions * 5,
        100
    )

    score = (
        total_amount
        + (total_transactions * 20)
        + consistency_bonus
    )

    return round(score, 2)