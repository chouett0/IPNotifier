function checkIp() {
      var accept_ips = [];
      chrome.storage.sync.get("ip_address_list", function(ip_addrs){
         if (ip_addrs.ip_address_list === undefined){
            accept_ips.push('127.0.0.1');
            chrome.storage.sync.set({"ip_address_list": ''}, function(){ });

         } else {
            var ip_list = ip_addrs.ip_address_list.split('\n');
            ip_list.forEach(ip_addr => {
               accept_ips.push(ip_addr);
            });
         }
      });

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(data) {
         if (xhr.readyState == 4) {
            if ( xhr.status == 200 ) {
               var gip = xhr.responseText;
               accept_ips.forEach(ipaddr => {
                  if ( gip != ipaddr  ) {
                     if ( !confirm("[!] Inprorer Global IP Address\nIP: "+gip) ){
                        clearInterval(checkIp);
       
                     }
                  } else {
   //                alert('IP OK!')
                     clearInterval(checkIp);
                  }
               });
      
            } else {
               alert("[!] Cannot Get Global IP Address. Plz Check Burp and Internet Access");
      
            }
         }
      };
      
      xhr.open('GET', 'https://inet-ip.info/ip');
      xhr.send();
}

checkIp();
setInterval(checkIp, 900000);
