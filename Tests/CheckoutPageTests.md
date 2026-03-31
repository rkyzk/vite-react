# チェックアウトページの動作検証:

## 対象ソース

Checkout.jsx
AddressCard.jsx
AddressList.jsx
AddressForm.jsx
PaymentForm.jsx
StripePayment.jsx
PaymentConfirmation.jsx
OrdeeredItem.jsx
OrderedItemsTable.jsx
index.js
authReducer.js

- No. はテーブル addresses を空にして行う。
- user1 でログインする。
- カートに商品 1 件を追加し、api/cart へ遷移、「購入手続きに進む」をクリックし api/checkout に遷移する。

| No  | テスト項目                                                | 手順                 | 期待される結果                                                                                                                                                                                                                                                            | 結果 | 実施日     |
| --- | --------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------- |
| 1   | api/checkout に遷移した際、期待通りの要素が表示されること | 表示される要素を確認 | 下記が表示される。<br/>お届け先の住所フォーム<br/>ラジオボタン「この住所を保存」（チェックあり）<br/>請求先住所のカラムにはラジオボタン「お届け先と同じ」（チェックあり）<br/>カード情報入力フォーム<br/>購入ボタン（表示される金額がカートの総計金額と等しいことを確認） | ○    | 2025/11/16 |

###

| 2 |「購入」をクリック時の動作、DB 更新データの確認（新しい届け先住所を保存） | 住所を記入、「この住所を保存」にチェック、カード情報を入力し、「購入」をクリック| 注文完了画面に遷移し下記が正しく表示される。<br/>届け先住所<br/>注文商品情報<br/>総計金額<br/>DB | ○ | 2025/11/16 |
| 2 | new shipping address will be saved | put an item in the cart, go to checkout page. Enter shipping address, card information and click 'proceed' | The shipping address will be displayed on order confirmation page. The address is saved in the DB | pass | 2025/8/3 |
| 3 | shipping address won't be saved when checkbox is unchecked. | put an item in the cart, go to checkout page. Enter shipping address, uncheck 'save address,' enter card information and click 'proceed' | The order confirmation page shows shipping address. The address is saved in the DB without the user id. | pass | 2025/8/3 |
| 4 | new billing address will be saved | put an item in the cart, go to checkout page. Enter shipping and billing addresses, card information and click 'proceed' | Both shipping and billing addresses will be displayed on order confirmation page. Both addresses are saved in the DB | pass | 2025/8/3 |
| 5 | Billing address won't be saved when checkbox is unchecked. | Put an item in the cart, go to checkout page. Enter shipping and billing addresses, card information and click 'proceed' | Both shipping and billing addresses will be displayed on order confirmation page. Billing address is saved in the DB without user id | pass | 2025/8/3 |
| 6 | Error is displayed when shipping address is not complete. | Put an item in the cart, go to checkout page. Enter all fields for shipping address except for postal code, enter card information and click 'proceed' | Error 'Enter valid Shipping address' is displayed | | |
| 7 | Error is displayed when only billing address is complete. | put an item in the cart, go to checkout page. Enter all fields for billing address, enter card information and click 'proceed' | Error 'Enter valid Shipping address' is displayed | | |
