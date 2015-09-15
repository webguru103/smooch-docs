You can grab the current user with `User.getCurrentUser` then set basic information with `setFirstName`, `setLastName`, `setEmail` and `setSignedUpAt`. You can also set your own custom properties by sending a map into `addProperties`.
    

```java
User skUser = User.getCurrentUser();
final Map<String, Object> customProperties = new HashMap<>();

skUser.setFirstName("Artour");
skUser.setLastName("Babaev");
skUser.setEmail("2ez@4rtz.com");
skUser.setSignedUpAt(new Date(1420070400000l));

customProperties.put("customDate", new Date());
customProperties.put("customFlag", true);
customProperties.put("customDigit", 322);

skUser.addProperties(customProperties);
```
