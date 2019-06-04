
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
        <div class="small-card-title">my recent subscriptions</div>
        <div class="d-flex flex-row wide-card-blocks-holder">
          <div class="align-self-center wide-card-block">  
            image here
          </div>
          <div class="wide-card-block">  
            <div class="small-card-item">buproprion</div>
            <div class="small-card-item">dosage: 75 milligrams</div>
            <div class="small-card-item">price: $38.00</div> 
            <div class="small-card-btn">edit</div> 
          </div>
          <div class="wide-card-block">  
            <div class="small-card-item">perscription status</div>
            <div class="small-card-item">in progress</div>
          </div>
        </div>
     </div>   
    </div> 
  )
}
