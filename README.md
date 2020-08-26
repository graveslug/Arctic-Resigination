#INDEX
concept
Toolbox
roadblocks
thank you



# arctic-resigination
store front concept/practice on skills to develop a full fledge web store Back to front

#Toolbox
Javascript
HTML
Bulma
Node
express
React view components
MongoDB
mongoose
Node


##Documentation (first draft)
[Dependencies]
bcryptjs: Used to hash passwords before storing them in the database
body-parser: used for incoming request bodies in the Middleware
is-empty: checks if something is empty. Used with validator.
validator: used to validate inputs from the user. Like password and confirm password
jsonwebtoken: used for authorization
passport: used to authenticate requests with strategies
passport-jwt: a passport strategies used for athenticating with JWT. Allows us to authenticate endpoints

A thorough explianation of the technologies used here. Mostly for my reference because I will forget what I am looking at/used.

jsonwebtoken (JWT):
    JWT is a temporary token that is used to authenticate a user. It is a string of integers that make up three parts. Each part is seperated by dot notation. Each string of this line represents three objects. The first string represents The Header. The second represents the payload. The third represents the signature.
    **This is a throw away example.
    Example:
    ##ENCODED
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkdyYXZlIFNsdWciLCJpYXQiOjE1MTYyMzkwMjJ9.Wmnqw5Naeb797cFqO8IotFdMywtr6I6Nmtkwl1PXgpE

    [HEADER]
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

    [PAYLOAD]
    .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkdyYXZlIFNsdWciLCJpYXQiOjE1MTYyMzkwMjJ9

    [KEY]
    .Wmnqw5Naeb797cFqO8IotFdMywtr6I6Nmtkwl1PXgpE

    ##Decoded
    [HEADER] algorithm & token type
    {
        "alg": "HS256",
        "typ": "JWT"
    }
    [PAYLOAD] data
    {
        "sub": "1234567890", //the id
        "name": "Grave Slug", // the name
        "iat": 1516239022 //date initialized
    }
    [KEY]Verify signature
    HMACSHA256(
        base64UrlEncode(header) + "." +
        base64UrlEncode(payload),
        //your 256bit secret
)

    The header doesn't have to written of as it is referenced under the hood.
    The payload can contain anything but be aware that it is not encrypted therefore it should not contain anything of that an attacker could use leverage to get into the account.

    The payload is validated by the receiver and by inspecting the the signature. Since there are many signatures we use the header as that contains the metadata needed.

    Lastly the verified signature is a MAC (message authentication code) which is only produced by somebody in contact of the payload, the header, and the secret key.

    How the signature is used to ensure authentication: When the client submits registration data (via validation/register.js folder)on the authentication server; the server validates the information (username and password combination) and creates a JWT token with the payload containing the users identifier and expiration timestamp.

    Then the server takes a secret key and uses it to sign the header plus the payload and sends it back to the user. In our case we tack on Bearer(more will be said on that below).

    The browser takes the signed JWT and adds it with each HTTP request to our apps server so the JWT acts as a temporary user that replaces the permanent credential that is made up of the username and password combination.

    The only way for an attacker to impersonate a user is steal both their username and their personal login password or steal the secret key from the authentication server. Pause a moment and think about the emails asking for your key. Should you give your key/password to it? Often emails will claim to be the CEO/lead at your company and they are asking for your key because they lost theirs. What would you do? The disappointing part is people fall for it.

##Bearer Token
A small note one the fromAuthHeaderAsBearerToken (or "Bearer" token from now on.)
    The bearer token used in this application grants access to authorized resources for the client rather than use the resources of the client (username and password for everything they request).

    A bearer token is a security token that any party in possession of (a bearer) can use the token in anyway that any other party in possession can. Using this token does not require a bearer to prove possession of the key. To prevent misuse the bearer tokens need to be protected in storage and in transport.

##bcryptjs
    bcryptjs stands for the version of crypt. In this implementation I used the Blowfish-based crypt.
    The bcryptjs incorporates a salt to protect against rainbow table attacks. However this is a simple implentation of bcryptjs and there are better ways to implement it that can feed to the hash salt multiple times to produce a strong hash.
    In short: a rainbow table attack is an attack that uses a database of passwords with their corresponding hashes to crack a password. It is more effect than brute-force methods. However salt usually prevents the rainbow table attacks by adding a randomized input to the hash.

    Since hash functions are one way meaning they cannot be decrypted the usage of salt adds another layer of input to protect the hash from being discovered. The salt acts as a safeguard since passwords are not stored in the database.

    bcrypt is an adapative function which means that overtime the iteration count can be increased to make it slower, so it remains resistance to brute-force search attacks even if there is an increase in cpu power.

    Below is a breakdown of the hash.
    $2b$[cost]$[22 character salt][31 character hash]

    further breakdown:
    alg:$2a$ //The has algorithm indentifier//
    cost:10  //Cost factor (2^10)
    salt: N9qo8uLOickgx2ZMRZoMye //(128-bit) salt, base64 encoded to 22 characters
    Hash: IjZAgcfl7p92ldGxad68LJZdL17lhWy //(192-bit) hash, base64 encoded to 31 characters

##is-empty
    Checks if a value is empty. That is it. Useful in combination with validator.

##Validator
    A simple tool that goes through all inputs to check if they meet the validation requirements that we had setup. This in general helps prevent the man in the middle attacks. It changes everything to a string. This is useful for username and password creation. It can go further and sanitize inputs by trimming. In this project I used it to set a min and max of a password size. You can find its usage in the validation folder where I setup parameters that the user must follow in order for their submission to be successful.




#Thank you for your help,
Viktor Moberg
Francesco Vertemati
Mike Hansen
Neil Freeman
Ira Herman
Arthur Bernier Jr
The Endless Amount of Albums I burned Through
The Endless tutorials, videos, and documentation that contradict each other to no end.
And the friends that stayed up late with me at night to talk about weird stuff, troubles, sharing tons of memes, and talking about neuroscience.
