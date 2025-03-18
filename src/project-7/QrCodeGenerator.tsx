import { SetStateAction, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import QRCode from 'react-qr-code';

const QrCodeGenerator = () => {
    const [qrCodeData, setQrCodeData] = useState('');
    const [disabled, setDisabled] = useState(false);

    const handleInputChange = (formData: FormData) => {
        const inputValue = formData.get('input') as string;
        if (inputValue == '') {
            console.error('input is empty, please fill input with some context :)');
            setDisabled(true);
            return;
        }
        setDisabled(false);
        setQrCodeData(inputValue);
    };

    return (
        <ComponentWrapper view="" className='viewport qr-code-generator' title="QR code generator">
            <form action={handleInputChange} className="">
                <input
                    type="text"
                    name="input"
                    placeholder='type a value for the qr-code'
                    className={disabled ? 'wiggle' : ''}
                    onChange={() => setDisabled(false)}
                />
                <button type="submit" disabled={disabled}>
                    generate
                </button>
            </form>
            <QRCode value={qrCodeData} className="qr-code" size={500} />
        </ComponentWrapper>
    );
};

export default QrCodeGenerator;
