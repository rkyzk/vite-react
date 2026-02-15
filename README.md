# EC サイト アプリ Frontend(Vite + React)

<img src="./src/main/resources/images/homepage.jpg" style="width: 85%;" alt="Landing page" title="ホームページ">

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
