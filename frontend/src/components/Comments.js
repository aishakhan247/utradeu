import React from 'react';
// import 'reactjs-popup/dist/index.css';
// import Popup from 'reactjs-popup';
import "./../styles/comments.css";

//export default () => (
const Comments = () => {
//   <Popup trigger={<button> Trigger</button>} position="right center">
  
  return (
    //<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <div class="container bootdey">
    <div class="col-md-12 bootstrap snippets">
    <div class="panel">
      <div class="panel-body">
        <textarea class="form-control" rows="2" placeholder="What are you thinking?"></textarea>
        <div class="mar-top clearfix">
          <button class="btn btn-sm btn-primary pull-right" type="submit"><i class="fa fa-pencil fa-fw"></i> Share</button>
          <a class="btn btn-trans btn-icon fa fa-video-camera add-tooltip" href="#"></a>
          <a class="btn btn-trans btn-icon fa fa-camera add-tooltip" href="#"></a>
          <a class="btn btn-trans btn-icon fa fa-file add-tooltip" href="#"></a>
        </div>
      </div>
    </div>
    <div class="panel">
        <div class="panel-body">
        {/* <!-- Newsfeed Content -->
        <!--===================================================--> */}
        <div class="media-block">
          <a class="media-left" href="#"><img class="img-circle img-sm" alt="Profile Picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/></a>
          <div class="media-body">
            <div class="mar-btm">
              <a href="#" class="btn-link text-semibold media-heading box-inline">Lisa D.</a>
              <p class="text-muted text-sm"><i class="fa fa-mobile fa-lg"></i>  11 min ago</p>
            </div>
            <p>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            <div class="pad-ver">
              <div class="btn-group">
                <a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a>
                <a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a>
              </div>
              <a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
            </div>
    
            {/* <!-- Comments --> */}
            <div>
              <div class="media-block">
                <a class="media-left" href="#"><img class="img-circle img-sm" alt="Profile Picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/></a>
                <div class="media-body">
                  <div class="mar-btm">
                    <a href="#" class="btn-link text-semibold media-heading box-inline">Bobby Marz</a>
                    <p class="text-muted text-sm"><i class="fa fa-mobile fa-lg"></i>  7 min ago</p>
                  </div>
                  <p>Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                  <div class="pad-ver">
                    <div class="btn-group">
                      <a class="btn btn-sm btn-default btn-hover-success active" href="#"><i class="fa fa-thumbs-up"></i> Like </a>
                      <a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a>
                    </div>
                    <a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
                  </div>
                </div>
              </div>
    
              <div class="media-block">
                <a class="media-left" href="#"><img class="img-circle img-sm" alt="Profile Picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
                </a>
                <div class="media-body">
                  <div class="mar-btm">
                    <a href="#" class="btn-link text-semibold media-heading box-inline">Lucy Moon</a>
                    <p class="text-muted text-sm"><i class="fa fa-globe fa-lg"></i>  2 min ago</p>
                  </div>
                  <p>Duis autem vel eum iriure dolor in hendrerit in vulputate ?</p>
                  <div class="pad-ver">
                    <div class="btn-group">
                      <a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a>
                      <a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a>
                    </div>                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
)
};

export default Comments;