module.exports = () => {
    return `
    <style>
        .commanders-photo{
            width:250px; 
            height: 250px; 
            background: #FCFCFC;
            float:right;
            border:1px solid #F0F0F0;
            margin-top:0.3em;
            text-align: center;
        }
        
        @media screen and (max-width: 480px){
            .commanders-photo {
                width: 100%;
            }
        }
        
        @media screen and (min-width: 600px) and (max-width: 780px){
            .commanders-photo {
                width: 100%;
            }
        }
    </style>
    <div style="display:flex">
    <section style="width : 100%;padding:0.5em;box-sizing: border-box">
        <h1 style="
        font-family: 'Abril Fatface', 'Arial Black', cursive; 
        font-size: 1.5em; 
        line-height: 1.4;">Commander's Message</h1>
        <h3 style="font-family: 'PT Serif', serif; line-height: 1.5; font-style: italic;">Commander's Message</h3>
        <p style="margin-top: 0.6em;padding-bottom:1em;">
        The standard Lorem Ipsum passage, used since the 1500s
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>
    </section>       
    </div>
    `
}