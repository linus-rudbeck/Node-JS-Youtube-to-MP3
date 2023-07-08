const fs = require('fs');
const { exec } = require('youtube-dl-exec');

// YouTube video URL
const videoUrl = '';

// Output file path
const outputPath = `youtube_${Date.now()}.mp3`;

(async () => {
  try {

    // Download video
    console.log('Downloading video...');
    
    await exec(videoUrl, {
        audioFormat: 'mp3',
        o: 'output.%(ext)s',
        x: true,
        ffmpegLocation: 'C:\\ffmpeg_230708\\bin\\ffmpeg.exe'
    });

    console.log('Download complete.');

    // Rename the downloaded file to the desired output path
    fs.renameSync('output.mp3', outputPath);

    console.log(`Conversion to ${outputPath} complete.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
