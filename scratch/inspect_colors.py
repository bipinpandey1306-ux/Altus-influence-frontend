from PIL import Image

img = Image.open('public/altus-logo.png').convert("RGBA")
w, h = img.size

# Let's classify pixels in the image and print count of each class
navy_count = 0
gold_count = 0
white_count = 0
trans_count = 0

for y in range(h):
    for x in range(w):
        p = img.getpixel((x, y))
        r, g, b, a = p
        
        # Transparent
        if r > 240 and g > 240 and b > 240:
            white_count += 1
            continue
            
        # Check if it's gold vs navy
        # Gold is warm: R is high, G is medium-high, B is lower.
        # Navy is dark: R, G, B are all low.
        is_gold = (r > 100 and g > 80 and b < 160 and r > b + 20)
        
        if is_gold:
            if gold_count < 5:
                print(f"Classified GOLD at ({x},{y}): R={r}, G={g}, B={b}")
            gold_count += 1
        else:
            if navy_count < 5:
                print(f"Classified NAVY at ({x},{y}): R={r}, G={g}, B={b}")
            navy_count += 1

print(f"Counts - Navy: {navy_count}, Gold: {gold_count}, White: {white_count}")
