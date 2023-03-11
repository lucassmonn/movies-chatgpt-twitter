import axios from 'axios';

export const getSummary = async (overview) => {
    try {
        const response = await axios.post(
            `https://api.openai.com/v1/engines/text-davinci-003/completions`,
            {
                prompt: 'Faça um tweet resumindo essa sinopse de até 240 caracteres: ' + overview,
                max_tokens: 2048,
                n: 1,
                stop: null,
                temperature: 0.5
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`
                }
            }
        );
        return response.data.choices[0].text;
    } catch (e) {
        return e
    }
}