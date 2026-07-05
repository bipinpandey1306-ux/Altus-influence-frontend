from PIL import Image

def process_pixel(p, is_light):
    r, g, b, a = p
    
    # 1. Background check
    if r > 248 and g > 248 and b > 248:
        return (255, 255, 255, 0)
        
    # 2. Check if gold
    # Gold pixels have high red/green and low blue, and red > blue + 20
    is_gold = (r > 100 and g > 80 and b < 170 and r > b + 20)
    
    if is_gold:
        F_gold = (200, 180, 130) # standard gold color
        # Estimate alpha based on distance from white
        diff_p = sum(255 - p[i] for i in range(3))
        diff_f = sum(255 - F_gold[i] for i in range(3))
        alpha = max(0, min(255, int(255 * diff_p / (diff_f if diff_f > 0 else 1))))
        
        # We can also keep the original gold colors, but make it transparent
        # Let's keep original gold color, but calculate alpha from how far it is from white background
        return (r, g, b, alpha)
    else:
        # Navy blue
        F_navy = (10, 20, 38)
        diff_p = sum(255 - p[i] for i in range(3))
        diff_f = sum(255 - F_navy[i] for i in range(3))
        alpha = max(0, min(255, int(255 * diff_p / (diff_f if diff_f > 0 else 1))))
        
        if is_light:
            # For light version, convert navy to white
            return (255, 255, 255, alpha)
        else:
            # For dark version, keep navy color
            # We can use a clean navy: (10, 28, 54) or original pixel
            return (10, 28, 54, alpha)

def generate():
    print("Loading original logo...")
    img = Image.open('public/altus-logo.png').convert("RGBA")
    w, h = img.size
    
    # Crop box for A icon
    fav_box = (281, 99, 741, 559)
    fav_img = img.crop(fav_box)
    fw, fh = fav_img.size
    
    # 1. Dark Icon (Favicon/Header)
    dark_icon = Image.new("RGBA", (fw, fh))
    dark_icon_pixels = []
    for y in range(fh):
        for x in range(fw):
            p = fav_img.getpixel((x, y))
            dark_icon_pixels.append(process_pixel(p, is_light=False))
    dark_icon.putdata(dark_icon_pixels)
    
    # Resize to standard size (e.g. 192x192 and 32x32)
    dark_icon.resize((192, 192), Image.Resampling.LANCZOS).save('public/favicon.png', "PNG")
    dark_icon.save('src/assets/altus-logo-dark.png', "PNG")
    print("Saved public/favicon.png and src/assets/altus-logo-dark.png")
    
    # 2. Light Icon (Footer)
    light_icon = Image.new("RGBA", (fw, fh))
    light_icon_pixels = []
    for y in range(fh):
        for x in range(fw):
            p = fav_img.getpixel((x, y))
            light_icon_pixels.append(process_pixel(p, is_light=True))
    light_icon.putdata(light_icon_pixels)
    light_icon.save('src/assets/altus-logo-light.png', "PNG")
    print("Saved src/assets/altus-logo-light.png")
    
    # 3. Full Dark Logo
    dark_full = Image.new("RGBA", (w, h))
    dark_full_pixels = []
    for y in range(h):
        for x in range(w):
            p = img.getpixel((x, y))
            dark_full_pixels.append(process_pixel(p, is_light=False))
    dark_full.putdata(dark_full_pixels)
    dark_full.save('src/assets/altus-full-logo-dark.png', "PNG")
    print("Saved src/assets/altus-full-logo-dark.png")
    
    # 4. Full Light Logo
    light_full = Image.new("RGBA", (w, h))
    light_full_pixels = []
    for y in range(h):
        for x in range(w):
            p = img.getpixel((x, y))
            light_full_pixels.append(process_pixel(p, is_light=True))
    light_full.putdata(light_full_pixels)
    light_full.save('src/assets/altus-full-logo-light.png', "PNG")
    print("Saved src/assets/altus-full-logo-light.png")

if __name__ == "__main__":
    generate()
