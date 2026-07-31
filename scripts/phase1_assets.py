from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def gradient(size, left, right):
    image = Image.new("RGB", size, left)
    pixels = image.load()
    width, height = size
    for x in range(width):
        ratio = x / max(1, width - 1)
        color = tuple(int(left[i] * (1 - ratio) + right[i] * ratio) for i in range(3))
        for y in range(height):
            pixels[x, y] = color
    return image


def draw_icon(draw, origin, scale=1):
    x, y = origin
    blue = (58, 134, 255)
    purple = (131, 56, 236)
    draw.rounded_rectangle((x, y, x + 180 * scale, y + 180 * scale), radius=int(38 * scale), fill=(11, 19, 43))
    draw.ellipse((x + 38 * scale, y + 32 * scale, x + 116 * scale, y + 110 * scale), outline=blue, width=max(2, int(14 * scale)))
    draw.line((x + 112 * scale, y + 106 * scale, x + 148 * scale, y + 146 * scale), fill=purple, width=max(2, int(14 * scale)))
    draw.ellipse((x + 66 * scale, y + 60 * scale, x + 88 * scale, y + 82 * scale), fill=blue)


def build_logo():
    image = Image.new("RGBA", (1200, 320), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw_icon(draw, (34, 70), 1)
    title = font(88, bold=True)
    draw.text((250, 96), "Detect", font=title, fill=(255, 255, 255))
    draw.text((565, 96), "HiddenFees", font=title, fill=(96, 165, 250))
    image.save(ROOT / "logo.png", format="PNG", optimize=True)


def build_og():
    image = gradient((1200, 630), (2, 6, 23), (30, 41, 96)).convert("RGB")
    draw = ImageDraw.Draw(image)
    draw.ellipse((760, -220, 1420, 440), fill=(37, 99, 235), outline=None)
    draw.ellipse((-250, 360, 420, 1040), fill=(124, 58, 237), outline=None)
    draw_icon(draw, (76, 74), 0.72)
    draw.text((235, 116), "DetectHiddenFees", font=font(50, bold=True), fill=(191, 219, 254))
    draw.text((80, 250), "Find Hidden Fees", font=font(76, bold=True), fill=(255, 255, 255))
    draw.text((80, 338), "Before They Cost You", font=font(76, bold=True), fill=(147, 197, 253))
    draw.text((84, 470), "AI-powered contract, bill, invoice, and estimate analysis", font=font(27), fill=(226, 232, 240))
    image.save(ROOT / "og-image.png", format="PNG", optimize=True)


if __name__ == "__main__":
    build_logo()
    build_og()
    print("Created logo.png and og-image.png")
