# EC サイト アプリ Frontend(Vite + React)

デプロイしたプロジェクト:
[Wild Blossom Garden](http://wild-blossom-garden.s3-website-ap-northeast-1.amazonaws.com)

### 概要

Java(Spring Boot)で作成したEコマースサイトのRest APIと連携するフロントエンドのプロジェクト。
商品閲覧、検索、アカウント登録、買い物かごに追加、住所とカード情報を記入して購入手続きなどが可能。

Rest APIのソース:
[ECサイトAPI](https://github.com/rkyzk/ecommerceapi)

### 主な機能

1. 商品閲覧
2. 商品検索（キーワード、花種、色でフィルター、人気順、価格が安い順に並び替え可能）
3. アカウント登録、ログイン機能（JWT、リフレッシュトークン使用）
4. 買い物かごに追加
5. カートを表示（商品、個数、小計を表示）
6. 購入手続き（住所登録、カード情報入力）
7. 注文内容表示
8. 購入履歴照会、レビュー投稿
9. 問い合わせページ（フォーム表示のみ。実際メッセージ送信は行わない。）

### 使用した言語、フレームワーク、ライブラリ、API

JavaScript (Vite + React)<br/>

### テスト

全般的に動作確認済み。
マニュアルテストを2026年2月以降実施予定。

## 教材

Udemy のコース "Java Spring Boot professional eCommerce project master class"</br>
https://github.com/EmbarkXOfficial/spring-boot-course
を参考に作成。

### 引用した文章、画像

- ホームページ<br/>
  https://shop.hanano-yamato.co.jp

- 商品詳細ページ<br/>
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

### 引用、参考にしたソース

https://stackoverflow.com/questions/74367838/react-select-dropdown-from-1-to-n</br>

spinner:</br>
https://tw-elements.com/docs/standard/components/spinners/</br>

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

code snippets:
box shadow (review entries on home page)
https://getcssscan.com/css-box-shadow-examples

getting window width
https://qiita.com/koji0705/items/b87601540c306290ca27

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
