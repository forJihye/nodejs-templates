const header = {
  "typ": "JWT",
  "alg": "HS256"
}

// encode to base64
const encodedHeader = new Buffer(JSON.stringify(header)).toString('base64').replace('=', '');
console.log('header: ', encodedHeader);

// 토큰에 담을 정보의 한 조각을 클레임이라 부른다. name: value 
const payload = {
  "iss": "velopert.com",
  "exp": "1485270000000", // 등록된 클레임
  "https://velopert.com/jwt_claims/is_admin": true, // 공개 클레임
  "userId": "11028373727102",
  "username": "velopert" // 비공개 클레임
}

const encodedPayload = new Buffer(JSON.stringify(payload)).toString('base64').replace('=', '');
console.log('payload: ', encodedPayload);

// signature (서명) 헤더의 인코딩값과 정보의 인코딩값을 합친 후 비밀키로 해쉬하여 생성
/**
 * HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)
 */

const crypto = require('crypto');
const signature = crypto.createHmac('sha256', 'secret').update(encodedHeader + '.' + encodedPayload).digest('base64').replace('=', '');
console.log('signature', signature);
