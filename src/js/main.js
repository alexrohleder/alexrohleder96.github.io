
$(function () {
    
    var resizeMainHeader = function resizeMainHeader() {
        $('#home').css('height', $(window).height());
        $('.content').css('marginTop', $(window).height());
    }

    var windowOnLoad = function windowOnLoad() {
        setTimeout(function () {
            $('.foreground').velocity('fadeOut', {'duration': 1000});
            $('.heading .animated').addClass('slideInUp');
            $('.logotype').remove();
        }, 1000);
    }

    var localAnchorOnClick = function localAnchorOnClick(ev) {
        ev.preventDefault();
        $($(this).attr('href')).velocity('scroll');
    }

    resizeMainHeader();
        
    $(window)
        .load(windowOnLoad)
        .resize(resizeMainHeader);

    $('.navbar-nav a, .heading .links .featured')
        .click(localAnchorOnClick);

    // steps form codrops
    // @see http://tympanus.net/codrops/2014/04/01/minimal-form-interface/
    new stepsForm(document.getElementById('contact-form'), {
        onSubmit: function(form) {
            classie.addClass(form.querySelector('.inner'), 'hide');

            var data = {
                'name': $('#contact-name').val(),
                'email': $('#contact-email').val(),
                'message': $('#contact-message').val()
            }

            $.ajax({
                type: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    "key": "XdNGXJqZNO9LtpufjHA1IQ",
                    "message": {
                        "from_email": data.email,
                        "to": [
                            {
                                "email": "alexrohleder96@outlook.com",
                                "name": "Alex Rohleder",
                                "type": "to"
                            }
                        ],
                        "autotext": "true",
                        "subject": data.name + " contatou via Portfólio",
                        "html": "<p>" + data.name + " <b>" + data.email + "</b></p><p>" + data.message + "</p>"
                    }
                }
            })

            var messageEl = form.querySelector('.final-message');
                messageEl.innerHTML = 'OBRIGADO! LOGO ENTRAREI EM CONTATO.';
            classie.addClass(messageEl, 'show');
        }
    });

});
