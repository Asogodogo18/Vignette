var fs = require("fs");

const isRemove = process.argv[process.argv.length - 1] == "-r";

const file =
  "node_modules/react-native/Libraries/Network/RCTHTTPRequestHandler.mm";
const delemeter = "#pragma mark - NSURLSession delegate";
const code = `
- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
  completionHandler(NSURLSessionAuthChallengeUseCredential, [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust]);
}
`;
console.log("#############   Reading File   ###############");
fs.readFile(file, "utf8", function (error, data) {
  if (error) {
    console.log("#############  error reading file  ###############");
    console.error(error);
    return;
  }
  if (data.indexOf(code) < 0 && !isRemove) {
    console.log("#############  Patch is not done.  ###############");
    console.log("#############  Patching file  ###############");
    var parts = data.split(delemeter);
    var newCodeBlock = parts[0] + delemeter + "\n" + code + "\n" + parts[1];
    fs.writeFile(file, newCodeBlock, function () {
      console.log("#############  Successfully patched file  ###############");
      console.log("#############  re build the ios project  ###############");
    });
  } else {
    if (isRemove) {
      var updatedCode = data.replace(code, "");
      fs.writeFile(file, updatedCode, function () {
        console.log(
          "#############  Successfully removed patch  ###############"
        );
        console.log("#############  re build the ios project  ###############");
      });
    } else {
      console.log(
        "#############  File already patched. No need again  ###############"
      );
    }
  }
});
