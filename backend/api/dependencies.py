def validate_text(
    text: str
):
    text = text.strip()

    if not text:
        raise ValueError(
            "Input text is empty."
        )

    return text