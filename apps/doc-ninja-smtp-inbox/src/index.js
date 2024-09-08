import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';

// Create an SMTP server instance
const server = new SMTPServer({
  authOptional: true, // Disable authentication for testing purposes
  onData(stream, session, callback) {
    simpleParser(stream, (err, parsed) => {
      if (err) {
        console.error('Error parsing email:', err);
        return callback(err);
      }

      console.log('Received email:');
      console.log('From:', parsed.from.text);
      console.log('To:', parsed.to.text);
      console.log('Subject:', parsed.subject);
      console.log('Text Body:', parsed.text);

      // Log any attachments (optional)
      if (parsed.attachments && parsed.attachments.length > 0) {
        console.log('Attachments:');
        parsed.attachments.forEach((attachment) => {
          console.log(`- ${attachment.filename} (${attachment.contentType})`);
        });
      } else {
        console.log('No attachments found.');
      }

      callback(); // Finish processing the email
    });
  }
});

// Start the server on port 2525
server.listen(2525, () => {
  console.log('SMTP server is listening on port 2525');
});
