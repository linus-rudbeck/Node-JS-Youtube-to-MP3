const { exec } = require('youtube-dl-exec');

const formatVideoName = (videoName) => {
  // Remove video name suffix
  videoName = videoName.split(' [')[0];

  // Remove special characters
  const regex = /[^a-z0-9]+/g;
  videoName = videoName.toLowerCase().replace(regex, '-');

  // Remove trailing hyphen
  if (videoName.endsWith('-')) {
    videoName = videoName.slice(0, -1);
  }

  return videoName;
}

module.exports = async (videoUrl) => {
  try {
    const videoNameCommand = await exec(videoUrl,{
      getFilename: true
    });
    const videoName = formatVideoName(videoNameCommand.stdout);
    
    const outputPath = `./downloads/${videoName}_${Date.now()}.mp3`;

    // Download video
    console.log('Downloading video: ', videoName);

    await exec(videoUrl, {
      audioFormat: 'mp3',
      o: outputPath,
      x: true,
      ffmpegLocation: 'C:\\ffmpeg_230708\\bin\\ffmpeg.exe'
    });

    console.log('Download complete.');

  } catch (error) {
    console.error('An error occurred:', error);
  }
};