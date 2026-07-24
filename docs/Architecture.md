\# System Architecture



\## Overview



Aavas Vani is an AI-powered speech processing web application that converts voice input into text using external AI APIs.



\---



\## High-Level Architecture



```

+------------------+

|      User        |

+------------------+

&#x20;        |

&#x20;        v

+------------------+

| React Frontend   |

+------------------+

&#x20;        |

&#x20;        v

+------------------+

| Axios API Calls  |

+------------------+

&#x20;        |

&#x20;        v

+------------------+

| Backend Server   |

+------------------+

&#x20;        |

&#x20;        +----------------------+

&#x20;        |                      |

&#x20;        v                      v

+------------------+    +------------------+

| Hugging Face API |    | Other AI APIs    |

+------------------+    +------------------+

&#x20;        |

&#x20;        v

+------------------+

| Response to UI   |

+------------------+

```



\---



\## Frontend



\- React

\- JavaScript

\- Axios

\- CSS



\---



\## Backend



\- Python / Flask (Update if applicable)

\- REST API



\---



\## External Services



\- Hugging Face

\- ngrok



\---



\## Deployment



Frontend can be deployed using Vercel or Netlify.



Backend should be deployed on a cloud VM or container platform.



\---



\## Security



\- Environment variables should be stored in `.env`

\- Never commit API keys

\- Rotate secrets periodically

