
//html for 
export const dashboard_small_card =()=>{
  return (
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">MY PROFILE</div>
        <div className="small-card-item">your name</div>
        <div className="small-card-item">your email</div>
        <div className="small-card-item">your phone</div> 
        <div className="small-card-btn">EDIT</div>
      </div> 
    </div> 
  )
}

export const dashboard_wide_card =()=>{
  return (
    <div class="main-content-wide-card">
      <div class="d-flex flex-column card-items-container">
        <div class="small-card-title">MY RECENT SUBSCRIPTIONS</div>
        <div class="d-flex flex-row wide-card-blocks-holder">
          <div class="align-self-center wide-card-block">  
            Image Here
          </div>
          <div class="wide-card-block">  
            <div class="small-card-item">Buproprion</div>
            <div class="small-card-item">Dosage: 75 milligrams</div>
            <div class="small-card-item">Price: $38.00</div> 
            <div class="small-card-btn">EDIT</div> 
          </div>
          <div class="wide-card-block">  
            <div class="small-card-item">Perscription status</div>
            <div class="small-card-item">In progress</div>
          </div>
        </div>
     </div>   
    </div> 
  )
}
