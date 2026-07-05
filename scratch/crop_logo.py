from PIL import Image

def process_logo():
    # Load original logo
    img = Image.open('public/altus-logo.png')
    img = img.convert("RGBA")
    w, h = img.size
    
    # 1. Create cropped favicon (A icon only)
    # Icon is at X=[287, 735], Y=[144, 549]
    # We crop a square box: X=[281, 741] (width 460), Y=[99, 559] (height 460)
    fav_box = (281, 99, 741, 559)
    fav_img = img.crop(fav_box)
    
    # Make white background transparent for favicon
    datas = fav_img.getdata()
    newData = []
    for item in datas:
        # If pixel is very close to white, make it transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    fav_img.putdata(newData)
    
    # Save favicon
    fav_img.save('public/favicon.png', "PNG")
    print("Saved public/favicon.png")
    
    # 2. Create a transparent version of the FULL logo
    # This is for headers/footers so it blends with dark/light backgrounds
    full_datas = img.getdata()
    newFullData = []
    for item in full_datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newFullData.append((255, 255, 255, 0))
        else:
            newFullData.append(item)
    img.putdata(newFullData)
    img.save('src/assets/altus-logo-transparent.png', "PNG")
    print("Saved src/assets/altus-logo-transparent.png")
    
    # Let's save a copy in public folder as well
    img.save('public/altus-logo-transparent.png', "PNG")
    print("Saved public/altus-logo-transparent.png")

if __name__ == "__main__":
    process_logo()
