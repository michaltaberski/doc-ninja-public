import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';
import { InboxItem, login, pb } from '@doc-ninja/data-layer';

// Create an SMTP server instance
const server = new SMTPServer({
  authOptional: true, // Disable authentication for testing purposes
  onData(stream, session, callback) {
    simpleParser(stream, async (err, parsed) => {
      if (err) {
        console.error('Error parsing email:', err);
        return callback(err);
      }

      const formData = new FormData();
      const { attachments, ...rest } = parsed;
      formData.append('meta', JSON.stringify(rest));
      (attachments || []).forEach((attachment) => {
        formData.append('files', new Blob([attachment.content]), attachment.filename);
      });
      return pb.collection('inbox').create<InboxItem>(formData);
    });
  }
});

const initApp = async () => {
  await login('api-user', 'api-user');
};

// Start the server on port 2525
server.listen(2525, async () => {
  await initApp();
  console.log('SMTP server is listening on port 2525');
});
