### Order History Page

1. Submit Review Form

| Nr. | tested featured        | procedure                                             | expected results                 | p/f | date |
| :-: | :--------------------- | :---------------------------------------------------- | :------------------------------- | :-- | :--- |
| 1.  | submit feedback button | On Order History Page press<br>submit feedback button | A review form will be displayed. |     |      |

- Check that correct data is inserted.
- Toast 'Your review has been submitted' with the right order id will be displayed.

  | Nr.| tested featured | text | stars |file |display name | p/f | date |
  |:--:|:----------------|:----:|:------:|:---:|:----------:| p/f | date |
  | 1. | validation<br>(normal, max characters, input all fields) | 250 characters | 5 |test.png |20 characters|||
  | 2. | validation<br>(normal, no input<br>in optional fields) | 250 characters | 5 |-- |-- |||
  | 3. | validation<br>(abnormal, no input<br>in text) | -- | 5 |-- |-- |||
  | 4. | validation<br>(abnormal, no star scores)| 250 characters | -- |-- |-- |||
  | 5. | validation<br>(abnormal, above max<br> characters in text)| 251 characters | 5 |-- |-- |||
  | 6. | validation<br>(abnormal, invalid file type)| 250 characters | 5 |text.txt |-- |||
  | 7. | validation<br>(abnormal, above max<br> characters in display name)| 251 characters | 5 |-- |21 characters |||
  | 8. | validation<br>(abnormal, multiple errors)| 251 characters | 5 |-- |21 characters |||

The following elements will be dispalayed:

- Text:
- input box
- five unfilled stars
- Submit button
