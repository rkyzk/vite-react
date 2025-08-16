# Ecommerce App Frontend

\
nvm use --lts
npm run dev

##

Product page
md:mt-0 not working

## to do

what to do when jwt expires
[object Object]
order history

shipping address is there
add new billing address. will not add b address in DB

when editing billing address need margin below heading
input validation
username and pw don't match

style

## To allow toast notifications

Chrome:
Settings > Privacy and Security > Pop-ups and redirects
Under 'Default behaviors,' select 'Sites can send pop-ups and redirects'

## Tests

Sign up/Log in page
|No|tested feature|procedure|expected|result|date|
|-|--------|
|1|layout|check layout from 330px to 1425px|All items are displayed fine and spacing among them is balanced.|||
|2|login function(normal)||All items are displayed fine and spacing among them is balanced.|||

Checkout page: address form

In table addresses in DB make sure no address exists with user_id = 1.
Log in as user1.

| No  | tested feature                                              | procedure                                                                                                                                              | expected                                                                                                                             | result | date     |
| --- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------ | -------- |
| 1   | address forms (when no address is registered for the user)  | put an item in the cart and go to checkout page                                                                                                        | Shipping address form is displayed.                                                                                                  | pass   | 2025/8/3 |
| 2   | new shipping address will be saved                          | put an item in the cart, go to checkout page. Enter shipping address, card information and click 'proceed'                                             | The shipping address will be displayed on order confirmation page. The address is saved in the DB                                    | pass   | 2025/8/3 |
| 3   | shipping address won't be saved when checkbox is unchecked. | put an item in the cart, go to checkout page. Enter shipping address, uncheck 'save address,' enter card information and click 'proceed'               | The order confirmation page shows shipping address. The address is saved in the DB without the user id.                              | pass   | 2025/8/3 |
| 4   | new billing address will be saved                           | put an item in the cart, go to checkout page. Enter shipping and billing addresses, card information and click 'proceed'                               | Both shipping and billing addresses will be displayed on order confirmation page. Both addresses are saved in the DB                 | pass   | 2025/8/3 |
| 5   | Billing address won't be saved when checkbox is unchecked.  | Put an item in the cart, go to checkout page. Enter shipping and billing addresses, card information and click 'proceed'                               | Both shipping and billing addresses will be displayed on order confirmation page. Billing address is saved in the DB without user id | pass   | 2025/8/3 |
| 6   | Error is displayed when shipping address is not complete.   | Put an item in the cart, go to checkout page. Enter all fields for shipping address except for postal code, enter card information and click 'proceed' | Error 'Enter valid Shipping address' is displayed                                                                                    |        |          |
| 7   | Error is displayed when only billing address is complete.   | put an item in the cart, go to checkout page. Enter all fields for billing address, enter card information and click 'proceed'                         | Error 'Enter valid Shipping address' is displayed                                                                                    |        |          |

In table addresses enter the following
only shipping address in DB
Go to Checkout page

5. Make sure the shipping address is displayed and
   the entry form for billing address is displayed.
   Place order. Order confirmation shows shipping address.

In table addresses enter the following
shipping address in DB
billing
Go to Checkout page

6. Check if both shipping and the billing addresses are displayed.
   Place order. Order confirmation displays both addresses.

check edit function:

7. go to checkout. Click 'edit' shipping address.
   Change all fields. click 'save'.
   Edited address is displayed.
   Check DB is upadted

8. go to checkout. Click 'edit' shipping address.
   Change all fields. Click 'cancel'
   Original address is displayed. Check the DB.
   Check the DB.
   N added function handleCancelEditAddress. OK

9. Go to checkout. Click 'edit' billing address.
   Change all fields. click 'save'.
   Edited address is displayed.
   Check DB is upadted

10. Go to checkout. Click 'edit' billing address.
    Change all fields. Click 'cancel'
    Original address is displayed. Check the DB.
    N added function handleCancelEditAddress. OK

11. Go to checkout. Click 'edit' billing address.
    Change all fields. Click 'cancel'
    Original address is displayed. Check the DB.
    N added function handleCancelEditAddress. OK

delete this address 7. delete billing address
billing address is deleted from the DB

12. test address validation

13. test no addresses, save address order
    see id redux addresses are updated ok

- Test validations on address form

14. Enter nothing in address forms.
    Fill out payment information and click on 'Proceed to pay'
    Error messages are displayed.
    'Enter valid address(es)'
    Error messages for all fields except for street2 are displayed.

checkout page is displayed when not logged in -> private route App.jsx

## Bugs

not logged in => Checkout => log in => should go back to checkout page
but goes to home page

## Credits

decription:
https://www.gardenia.net

https://www.shootgardening.com/plants/hyacinthus-orientalis-anastasia

spinner:</br>
https://tw-elements.com/docs/standard/components/spinners/

eye button for diplaying/hiding password (login & register pages)
https://stackoverflow.com/questions/70885518/how-do-i-add-a-password-visibility-button-for-a-text-input

category pulldown from tailwindcss

productCard
quantity select box
https://stackoverflow.com/questions/74367838/react-select-dropdown-from-1-to-n

products descriptions, images
https://www.gardenersworld.com/how-to/grow-plants/best-crocus-varieties-to-grow/

https://www.gardenia.net/plant/tulipa-apricot-beauty-single-early-tulip

https://www.peternyssen.com/autumn-planting/miscellaneous-bulbs/camassia/blue-heaven.html
