# Wild Blossom Garden<br>E-commerce Site Frontend App (Vite + React)

<img src="./src/assets/homepage.jpg" style="width: 85%;" alt="Landing page" title="landing-page">

Deployed project:
[Wild Blossom Garden](https://main.d318qultnvdzu6.amplifyapp.com)

### Overview

Wild Blossom Garden is an imaginary online shop selling flower bulbs. Here users can browse products, place items in carts, enter delivery and payment information and place orders. They can also view their order history and submit feedback about their purchase. This frontend application communicates with the Rest API built with Java Spring Boot, which manages to store data in database, ...
The application is built responsible for different screen sizes above 330px.

The source code for the Rest API can be found <a href="https://github.com/rkyzk/ecommerceapi/tree/dev-eng" target="_blank">here</a>.

### Languages, Framework, Libraries

JavaScript (Vite + React)

### Main Functions

- Browse Products
- View product details
- Search products by keywords, flower kinds, colors
- Sort products by popularity and prices
- Manage user accounts
- Login/logout users (JWT and refresh tokens are used.)
- Add items to carts, update quantities/delete products.
- Display items in the cart and the total price
- Enter delivery and payment information
- Place orders
- View order history, submit feedback of purchases
- View review entries of other customers
- Enter inquiry form (the form won't be actually submitted.)

### Functions of Common Elements and Pages in Detail

<h3 style="fontSize: 1rem;">1. Common Elements across the Pages</h3>

#### Navigation Bar

- Placed at the top across the page, the navigation bar offers the following links.
  |Nr. |Item |Destination (or events when clicked.) |
  |:--:|:-------------|:---------------------|
  |1. |Logo |Landing Page |
  |2. |Home |Landing Page |
  |3. |Contact| Contact form |
  |4. |SHOP | Product list page |
  |5. |Cart | The current user's cart page|
  |6. |LOGIN <br>(When the user is<br> not logged in) |Login or register dialog will be displayed|
  |7. |The current user's<br>username| A dropdown menu appears.|

- When the current user's name in the navigation bar is clicked, the following options will be displayed in the dropdown menu.
  |Nr. |Item |Destination, (or action when clicked.) |
  |:--:|:-------------|:---------------------|
  |1. |Order History & Send Feedback |Order history page |
  |2. |Logout |The user will be logged out and will be taken to the landing page. |

#### Menu Bar

On the landing page, cart page and checkout page, a menu bar appears on the left side of the window for a screen size above 768px. The menu bar allows quick access to product lists by categories.

#### Footer

The footer includes the brand of the shop, a copyright statement and links to facebook and instegram.

#### Login/logout Dialog

<h3 style="fontSize: 1rem;">2. Each Page in Detail</h3>

#### Landing Page

The landing page showcases the products and promotes sales while offering enjoyable visual experience for site visitors. It contains an eyecatching hero banner, quick access to product lists and positive review entries from customers.

- Hero Banner<br>
  A carousel displays scenaries of the garden including their products. Autoplay and fade effects of 'swiper' library are applied in order to enhance visual experience of the page.

- Links to Product Lists<br>
  An image of each category is displayed, which serves as links to a product list of the category. The section prompts users to browse products.

- Customer Reviews<br>
  The section introduces positive feedback entries from customers, which will promote sales. In this application, customers can submit feedback and optionally an image of their purchased product on 'Order History' page. When admin personnel reviews the entry and decides to post it in this section, they can set publicizeFlg of the record in the DB table 'Reviews' to true, and the entry will be shown in the section. The reviews are shown in the order of the most recent to the oldest. The review contains the customers's feedback, reviewed date, the customer's display name and an image, if it was submitted.

#### Contact Page

If users wish to contact the personnel of Wild Blossom Garden, they can fill the inquiry form and send it. The page is not equiped with the function to actually send the form for a review.

#### Shop Page

1. Filter and sort
   The shop page has filter and sort options and displays a product list accordingly.
   If multiple filter options are selected, the products that match all options will ne displayed.

<h3 style="fontSize: 1rem;">Keywords Filter<h3>
  - Users can enter up to three keywords in the input box, separated by spaces or commas.
  - Only those products will be selected, whose data contain one of more of the keywords.

<h3 style="fontSize: 1rem;">Color Filter<h3>
  - One or more colors can be selected in the checkbox, and the products that match at least one color will be displayed as results.
  - Products may be classified as having only one color or multiple colors.

<h3 style="fontSize: 1rem;">Category Filter<h3>
- Flower kind can be selected by the pulldown box.

<h3 style="fontSize: 1rem;">Order by popularity<h3>
- When 'most sold' is selected, the products will be ordered by the sales count in the past 30 days.

<h3 style="fontSize: 1rem;">Order by prices (low to high)<h3>
- As the label explains, the products will be ordered by ascending prices.

2. Other Features

- Clicking the product images take the users to product detail pages.
- Users can add products by clicking 'Add to cart' buttons.
- Quantity can be selected by the pulldown box.

#### Product Detail Page

- First a short paragraph introduces the features of the product.
- A list gives practical data such as plant height, spacing and depth at and optimal soil condition.
- Additional Notes provide users with growing tipps. These notes are written for each category -- the same notes are used for all tulips, and that applies for other categories.

#### Cart Page

- The cart page shows a table of products, quantities, unit prices and the total price of the cart.
- The user can change the quantity using the pulldown box, and the total price will be updated accordingly.
- The cart data will not be sent to the backend until the user places the order.
- If the user loggs out, the cart data will be lost.

#### Checkout Page

1. Address section

- If the user has not saved addresses previously, a shipping address form will be displayed. If the user has saved an address(es), the saved address(es) will be displayed. The same applies for billing addresses.
- By default the billing address is set the same as shipping address. The user can check the radio botton if they need to enter a different address.
- The user can choose to save or not save the address. If he/she chooses to save the address, it will be displayed on the page next time and the user won't need to reenter it.
- The user can set the address as default address so that the address will appear at the top if the user enters multiple addresses.
- limit?

2. Card Information

- The user can enter their credit card information.

3. Items in the Cart

- Cart items and the total price are shown in the section, so users can make sure their order is what they intend, before they proceed to make payment.
- If 'Proceed to Purchase' button is clicked, the order will be placed, and the user is taken to the payment confirmation page.

#### Order Confirmation Page

#### Order History Page

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
