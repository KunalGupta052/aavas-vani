\# Troubleshooting Guide



\## npm install fails



Delete node\_modules and run:



npm install



\---



\## API not working



Check:



\- HF\_TOKEN

\- Backend server

\- Internet connection



\---



\## CORS Error



Ensure backend allows frontend origin.



\---



\## Port Already in Use



Change port or terminate existing process.



\---



\## Environment Variables



Verify all required variables are present in `.env`.



\---



\## Build Issues



Delete node\_modules and package-lock.json.



Run:



npm install



npm run build

