from PIL import Image

img = Image.open("button_2.png").convert("RGB")  # force RGB mode
pixels = list(img.getdata())

# Compute average color
r = sum(p[0] for p in pixels) // len(pixels)
g = sum(p[1] for p in pixels) // len(pixels)
b = sum(p[2] for p in pixels) // len(pixels)

print("RGB:", (r, g, b))
print("HEX:", "#{:02x}{:02x}{:02x}".format(r, g, b))
# from PIL import Image


# import numpy as np

# img = Image.open("button.png")  # replace with your file path
# arr = np.array(img)

# # Flatten to a list of RGB pixels
# pixels = arr.reshape(-1, 3)

# # Compute the average color (good for flat-color buttons)
# avg_color = pixels.mean(axis=0).astype(int)

# print("RGB:", tuple(avg_color))

# # If you prefer hex:
# hex_color = "#{:02x}{:02x}{:02x}".format(*avg_color)
# print("HEX:", hex_color)
