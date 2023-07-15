const fs = require('fs');
const download = require('./download-video');

(async () => {
  // Get video urls from separate file
  const videoUrlsJSON = fs.readFileSync('./video-urls.json', 'utf8');
  let videoUrls = JSON.parse(videoUrlsJSON);

  for (const videoUrl of videoUrls) {
    // Download video
    await download(videoUrl);
    
    // Remove video url from file
    videoUrls = updateVideoUrls(videoUrls, videoUrl);
  }
})();

function updateVideoUrls(videoUrls, videoUrl) {
  const updatedVideoUrls = [...videoUrls];
  updatedVideoUrls.splice(updatedVideoUrls.indexOf(videoUrl), 1);
  fs.writeFileSync('./video-urls.json', JSON.stringify(updatedVideoUrls));

  // Update videoUrls variable for the next iteration
  videoUrls = updatedVideoUrls;
  return videoUrls;
}
