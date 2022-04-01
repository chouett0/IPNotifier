document.getElementById("save-btn").addEventListener("click", ()=>{
  var ip_addrs = document.getElementById("textarea").value;
  chrome.storage.sync.set({"ip_address_list": ip_addrs}, function(){ });
});

chrome.storage.sync.get("ip_address_list", function(ip_addrs){
   document.getElementById("textarea").value = ip_addrs.ip_address_list;
});

