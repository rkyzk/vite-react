# Ecommerce App Frontend

spring green
golden artist
1404
1405
1406

\
nvm use --lts
npm run dev

## to do

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

Checkout page: address form

In table addresses in DB make sure no address exists with user_id = 1.
Log in as user1.

1. Fill out shipping address only. Check 'save this address.' Order confirmation is displayed. The address is saved. y
2. Fill out shipping address only. Uncheck 'save this address' order confirmation is displayed. y
3. Fill out shipping address (save) and billing address (save).
   Order confirmation shows both addresses. both addresses are saved in the DB
4. Fill out shipping address (save) and billing address (uncheck save).
   Order confirmation shows both addresses. In address table the user id of the shipping address has a value, while the user id of the billing address is null.

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
