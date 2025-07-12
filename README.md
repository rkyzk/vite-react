# Ecommerce App Frontend

\
nvm use --lts
npm run dev

## to do

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
   more space between B & S addresses
4. Fill out shipping address (save) and billing address (uncheck save).
   Order confirmation shows both addresses. only shipping addresse is saved in the DB

In table addresses enter the following
only shipping address in DB
Go to Checkout page

5. make sure the shipping address is displayed.
   Entry form for billing address is displayed.
   place order. Order confirmation is displayed.

In table addresses enter the following
shipping address in DB
billing
Go to Checkout page

6. check if the shipping address and the billing address are displayed.
   place order. Order confirmation is displayed with both addresses.

check edit function:

7. go to checkout. Click 'edit' shipping address.
   Change all fields. click 'save'.
   Edited address is displayed.
   Check DB is upadted

8. go to checkout. Click 'edit' shipping address.
   Change all fields. Click 'cancel'
   Original address is displayed. Check the DB.

9. Go to checkout. Click 'edit' billing address.
   Change all fields. click 'save'.
   Edited address is displayed.
   Check DB is upadted

10. Go to checkout. Click 'edit' billing address.
    Change all fields. Click 'cancel'
    Original address is displayed. Check the DB.

delete this address 7. delete billing address
billing address is deleted from the DB

## Bugs

not logged in => Checkout => log in => should go back to checkout page
but goes to home page

## Credits

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
