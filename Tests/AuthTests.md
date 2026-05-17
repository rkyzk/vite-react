### Testing Register and Login form

1. Testing validation
   |Nr. |tested field(s)|tested feature|username to be entered|email|password|expected results|error message if any|pass/fail|date|
   |:---:|:----------|:-------------|:---------------------|:-------------|:-------------|:-------------------|:-------------|:--|:----|
   |1. |all fields|normal, min # of characters|3 characters|test@mail.com|Test123!|Toast message 'Your account has been created.<br>Please log in.' will appear.<br>Record is created in the table 'users'|-|||
   |2. |all fields|normal, max # of characters|20 characters|test@mail.com|Test123!Test123!|Toast message 'Your account has been created.<br>Please log in.' will appear.<br>Record is created in the table 'users'|-|||
   |3. |Username|abnormal, empty|-|test@mail.com|Test123!|Error|Username must be 3-20 characters.|||
   |4. |Username|abnormal, 3 empty spaces|enter 3 spaces|test2@mail.com|Test123!|Error|Username must be 3-20 characters.|||
   |5. |Username|abnormal, less characters than min|2 characters|test2@mail.com|Test123!|Error|Username must be 3-20 characters.|||
   |6. |Username|abnormal, more characters than max|21 characters|test2@mail.com|Test123!|Error|Username must be 3-20 characters.|||
   |7. |Username|already registered username|testuser|test2@mail.com|Test123!|Error|The username is already in use.|||
   |8. |Email|abnormal, empty|3 characters|-|Test123!|Error|Enter a valid email.|||
   |9. |Email|abnormal, empty spaces|3 characters|enter 3 spaces|Test123!|Error|Enter a valid email.|||
   email.|||
   |10. |Email|abnormal, no '@'|3 characters|testemail|Test123!|Error|Enter a valid email.|||
   |11. |Email|abnormal, no period|3 characters|test@emailcom|Test123!|Error|Enter a valid email.|||
   |12. |Email|abnormal, end with a period|3 characters|test@emailcom.|Test123!|Error|There was an error. Please try again.|||
   |13. |Email|abnormal, registered email|3 characters|test@email.com|Test123!|Error|The email is already in use.|||
   |14. |Password|abnormal, empty|3 characters|test@email.com|-|Error|Password should be 8-16 characters<br>containing at least one lower case<br> letter, one upper case letter,<br> a digit and a special character.|||
   |15. |Password|abnormal, empty|3 characters|test@email.com|-|Error|Password should be 8-16 characters<br>containing at least one lower case<br> letter, one upper case letter,<br> a digit and a special character.|||
   |16. |Password|abnormal, less characters than min|3 characters|test@email.com|8 spaces|Error|Password should be 8-16 characters<br>containing at least one lower case<br> letter, one upper case letter,<br> a digit and a special character.|||
   |17. |Password|abnormal, more characters than max|3 characters|test@email.com|Test123!Test123!1|Error|Password should be 8-16 characters<br>containing at least one lower case<br> letter, one upper case letter,<br> a digit and a special character.|||
   |18. |Password|abnormal, only characters|3 characters|test@email.com|TestTest|Error|Password should be 8-16 characters<br>containing at least one lower case<br> letter, one upper case letter,<br> a digit and a special character.|||
   |19. |Password|abnormal, only characters|3 characters|test@email.com|12345678|Error|Password should be 8-16 characters<br>containing at least one lower case<br> letter, one upper case letter,<br> a digit and a special character.|||
   |20. |Username, Email (multiple fields)|abnormal, empty username, mal-formed email|-|testcom|Test1234!|Error|error message for username: 3<br>error message for email: 10<br>|||
