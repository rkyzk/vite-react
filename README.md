# Wild Blossom Garden - E-commerce Site Frontend App (Vite + React)

<img src="./src/assets/homepage.jpg" style="width: 85%;" alt="Landing page" title="landing-page">

Deployed project:
[Wild Blossom Garden](https://main.d318qultnvdzu6.amplifyapp.com)

### Overview

Wild Blossom Garden is an imaginary online shop selling flower bulbs. Here users can browse products, place items in carts, enter delivery and payment information and place orders. They can also view their order history and submit feedback about their purchase. This frontend application communicates with the REST API built with Java Spring Boot.

The source code for the Rest API can be found <a href="https://github.com/rkyzk/ecommerceapi/tree/dev-eng" target="_blank">here</a>.

### Languages, Framework, Libraries

JavaScript (Vite + React)

### Main Functions

- Browse Products
- View product details
- Search products by keywords, flower kinds, colors
- Sort by popularity and prices
- Create accounts, authenticate requests（JWT、refresh tokens）
- Add items to carts, update quantities/delete products.
- Display items and total price in the current cart
- Enter delivery and payment information
- Place Order
- View order history, submit feedback
- View review entries
- Enter inquiry form (the form won't be actually submitted.)

### Functions of Common Elements and Pages in Detail

<h2>Common Elements</h2>
#### Navigation Bar

- Placed at the top across the window, the navigation bar offers the following links.
  |Nr. |Item |Destination (or events when clicked.) |
  |:--:|:-------------|:---------------------|
  |1. |Logo |Landing Page |
  |2. |Home |Landing Page |
  |3. |Contact| Contact form |
  |4. |SHOP | product list page |
  |5. |Cart | the current user's cart page|
  |6. |LOGIN <br>(When the user is<br> not logged in) |login or register dialog will be displayed|
  |7. |The current user's<br>username| a dropdown menu appears.|

- When the current user's username is clicked, the following options will be displayed in the dropdown menu.
  |Nr. |Item |Destination, (or action when clicked.) |
  |:--:|:-------------|:---------------------|
  |1. |Order History & Send Feedback |Order history page |
  |2. |Logout |The user will be logged out, and the landing page will be displayed. |

#### Menu Bar

On the landing page, cart page and checkout page, a menu bar appears on the left side of the window for a screen size above 768px. The menu bar allows quick access to product lists by categories.

#### Footer

The footer includes the brand of the shop, a copyright statement and links to facebook and instegram.

#### Landing Page

- Hero Banner
  A carousel displays images of Wild Blossom Garden, showcasing the beautiful scenaries of the garden. I used Swiper and applied effects including autoplay and fade, so the site visitors can visually enjoy the page.

- Links to Product Lists
  An image of each category is displayed, which serves as links to a product list of the category. The section allows users to access categorized product lists
  !!!!!!!!

- Customer Reviews
  The section introduces positive feedback entries from customers, which will promote the sales. Customers can submit feedback and optionally an image of their purchased product on 'Order History' page. When admin personnel reviews the entry and decides to post it in this section, they can set publicizeFlg of the record in the DB table 'Reviews' to true, and the entry will be shown in the section. The reviews are shown in the order of the most recent to the oldest. The review contains the customers's feedback, reviewed date, the customer's display name and an image, if it was submitted.

### Credits

<p>I learned methods to build ecommerce applications in the following course at Udemy:</br>
  "Java Spring Boot professional eCommerce project master class"</br>
  https://github.com/EmbarkXOfficial/spring-boot-course</p>

<p>Paragraphs used in the app are taken and modified from the following sources.</p>

- Introduction on the landing page.<br/>
  https://shop.hanano-yamato.co.jp

- Review Entries<br/>
  https://russellsmillsflowerco.com/pages/reviews?srsltid=AfmBOoqZm2Eo8DMq6DLf0MM5P129YBGATlrbwkyxQB4l_ZaIp8yC_msr

- Product Detail Pages<br/>
  https://www.pref.toyama.jp/1613/sangyou/nourinsuisan/nougyou/kj00014132/kj00014132-011-01.html<br/>
  https://www.919g.co.jp/blog/?p=7420<br/>
  https://www.gardenersworld.com/how-to/grow-plants/best-crocus-varieties-to-grow/<br/>
  https://northernwildflowers.ca/collections/shop-seeds/products/smooth-aster<br/>
  https://www.gardenia.net/plant/tulipa-apricot-beauty-single-early-tulip<br/>
  https://www.peternyssen.com/autumn-planting/miscellaneous-bulbs/camassia/blue-heaven.html<br/>
  https://www.gardenersworld.com/how-to/grow-plants/best-crocus-varieties-to-grow/<br/>
  https://www.gardenia.net/plant/tulipa-apricot-beauty-single-early-tulip<br/>
  https://www.peternyssen.com/autumn-planting/miscellaneous-bulbs/camassia/blue-heaven.html<br/>
  https://www.edenbrothers.com/products/dahlia-bulbs-belle-of-barmera<br/>
  https://www.peternyssen.com/autumn-planting/tulips.html?p=2<br/>
  https://en.wikipedia.org/wiki/Crocus#/media/File:860808-Saffronfarm-01-IMG_7707-2.jpg<br/>
  https://www.bulbi.nl/en/barcelona<br/>
  https://www.longfield-gardens.com/blogs/all-about-fall-planted-bulbs/all-about-crocus?srsltid=AfmBOoqgGQz2gYQu2CWDxciVl-4dh-UHjXU78a_b-AKofO9gvS6t5_LN

<p>I utilized code snippets from the following websites.</p>

- Drop down box for product quantity</br>
  https://stackoverflow.com/questions/74367838/react-select-dropdown-from-1-to-n

- Spinner</br>
  https://tw-elements.com/docs/standard/components/spinners/

- Logic to send image file from react to the backend</br>
  https://zenn.dev/juth/articles/form-json-formdata-spring

### Bugs

Autofocus on Login dialog is not working.
