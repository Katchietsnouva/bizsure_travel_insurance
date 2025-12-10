import qrcode

url = "https://book-your-insurance-cloud-demo.vercel.app/"

img = qrcode.make(url)
img.save("qr_code.png")

print("QR code saved as qr_code.png")
