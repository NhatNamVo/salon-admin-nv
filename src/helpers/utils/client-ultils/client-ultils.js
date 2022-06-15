export const formatKRMobileAndPhoneNumber = function (phoneNumber) {
    if (phoneNumber.length == 10) { // 000-000-0000 or 02-0000-0000(PhonephoneNumber)
      if (phoneNumber.substring(0, 2) != '02') return phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10)
  
      return phoneNumber.substring(0, 2) + '-' + phoneNumber.substring(2, 6) + '-' + phoneNumber.substring(6, 10)
    }
  
    if (phoneNumber.length == 9) // 00-000-0000
      return phoneNumber.substring(0, 2) + '-' + phoneNumber.substring(2, 5) + '-' + phoneNumber.substring(5, 9)
  
    if (phoneNumber.length == 8) // 0000-0000
      return phoneNumber.substring(0, 4) + '-' + phoneNumber.substring(4, 8)
  
    if (phoneNumber.length >= 11)  //000-xxxxx-0000
      return phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3, phoneNumber.length - 4) + '-' + phoneNumber.substring(phoneNumber.length - 4, phoneNumber.length)
  
    return phoneNumber
}