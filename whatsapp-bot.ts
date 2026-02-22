import { makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import pino from 'pino';
import qrcode from 'qrcode-terminal';

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('whatsapp_auth_info');

    const socket = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }) // Mute logs for cleaner QR display
    });

    socket.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const error = (lastDisconnect?.error as Error & { output?: { statusCode: number } });
            const shouldReconnect = error?.output?.statusCode !== 401;
            console.log('Connection closed. Reconnecting:', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('¡Conectado exitosamente a WhatsApp!');
        }
    });

    socket.ev.on('creds.update', saveCreds);

    socket.ev.on('messages.upsert', async (m) => {
        console.log('Nuevo mensaje recibido:', JSON.stringify(m, undefined, 2));
    });
}

connectToWhatsApp();
