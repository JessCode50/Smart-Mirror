"use client"
export default function settings() {  
  function handleSubmit(e:any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    
    //hardcode which setting goes to which api

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
  
  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        Please modify the settings as you wish, then press "save".<br></br>
        <button type="submit" className="border-solid border-black border-2">Save Settings</button>
        <br></br><br></br>
    
        <div className="grid grid-cols-3 gap-4">
      
          <div><h1 className="text-2xl">NEWS SETTINGS</h1><br></br>
        
            <label>
              Keywords (max 512 characters): <input name="q" type="text" placeholder="type here" className="border-solid border-black border-2"/>
            </label><br></br><br></br>
      
            <label>
              Countries: <input name="country" type="text" placeholder="type here" defaultValue="ca,us" className="border-solid border-black border-2"/>
            </label><br></br>
            <h6 className="text-xs">Go here to see a list of all country codes: https://bit.ly/MagicMirrorCountries</h6><br></br>
        
            <label>
              Categories: <input name="category" type="text" placeholder="type here" defaultValue="politics,sports" className="border-solid border-black border-2"/>
            </label><br></br>
            <h6 className="text-xs">Go here to see a list of all category codes: https://bit.ly/MagicMirrorCategories</h6><br></br>
        
            <label>
              Languages: <input name="language" type="text" placeholder="type here" defaultValue="en,fr" className="border-solid border-black border-2"/>
            </label><br></br>
            <h6 className="text-xs">Go here to see a list of all language codes: https://bit.ly/MagicMirrorLanguages</h6><br></br>
        
            <label>
              Domains: <input name="domain" type="text" placeholder="type here" className="border-solid border-black border-2"/>
            </label><br></br><br></br>
        
            <label>
              Exclude Domains: <input name="excludedomain" type="text" placeholder="type here" defaultValue="news.google.com,9to5google.com" className="border-solid border-black border-2"/>
            </label><br></br><br></br>
        
            <label>
              Number of Articles (max 10): <input name="size" type="number" max="10" required defaultValue="3" className="border-solid border-black border-2"/>
            </label><br></br><br></br>

            The following are READ ONLY.<br></br>
            <label>Featured Image: <input name="image" type="number" readOnly defaultValue="0" className="border-solid border-black border-2"/> </label><br></br><br></br>
            <label>Video: <input name="video" type="number" readOnly defaultValue="0" className="border-solid border-black border-2"/> </label><br></br><br></br>
            <label>Remove Duplicates: <input name="removeduplicate" type="number" readOnly defaultValue="1" className="border-solid border-black border-2"/> </label><br></br><br></br>
          </div>

          <div><h1 className="text-2xl">WEATHER SETTINGS</h1>
            <input name="test" type="number" required defaultValue="3" className="border-solid border-black border-2"/>
          </div>
          
          <div><h1 className="text-2xl">OUTFIT SETTINGS</h1>
          <input name="test" type="number" required defaultValue="3" className="border-solid border-black border-2"/>
          </div>
        
        
        
        </div>
      
      
      </form>
    </div>
  )
}