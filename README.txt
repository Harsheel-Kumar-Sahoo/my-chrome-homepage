HARSHEEL'S CHROME HOMEPAGE

1. Extract this folder somewhere permanent, e.g. Documents\Chrome Homepage.
2. Put your photos in the images folder and name them:
   image1.jpg, image2.jpg, image3.jpg, image4.jpg
   (You can use fewer or more; update the imageFiles list in script.js.)
3. Open Chrome and visit: chrome://extensions
4. Turn ON "Developer mode" (top-right).
5. Click "Load unpacked".
6. Select the extracted "harsheel_chrome_homepage" folder (the one containing manifest.json).
7. Open a new tab. Your custom homepage should appear.

To change the slideshow speed, edit the 7000 value at the bottom of script.js.
It is in milliseconds: 7000 = 7 seconds.

To add/remove photos, edit the imageFiles array in script.js.
The first two files are also used as the initial two slideshow layers.

This extension overrides Chrome's New Tab page. It does not replace the separate
Home button page or Chrome's startup setting.
