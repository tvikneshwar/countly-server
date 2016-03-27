var EditableField = React.createClass({

    getInitialState: function() {

        if (this.props.options_values)
        {
            var value_key = this.props.value;
            var value = this.props.options_values[value_key];
        }
        else {
            var value = this.props.value;
            var value_key = false;
        }

        return({
            value : value,
            value_key : value_key,
            edit_open : false
        });

    },

    componentWillReceiveProps: function(nextProps) {

        if (this.props.options_values)
        {
            var value_key = nextProps.value;
            var value = this.props.options_values[value_key];
        }
        else {
            var value = nextProps.value;
            var value_key = false;
        }

        this.setState({
            value: value,
            value_key : value_key
        });

    },

    handleValueChange: function(new_value) {

        if (this.props.options_values) // todo: ??
        {
            var value_key = new_value;
            new_value = this.props.options_values[new_value];
        }

        var new_state = {
            "value" : new_value,
            "value_key" : value_key,
        };

        if (!this.state.prev_value)
        {
            new_state.prev_value = this.state.value;
            new_state.prev_value_key = this.state.value_key;
        }

        this.setState(new_state);
    },

    edit_click : function() {

        if (this.state.edit_open) return false;

        this.setState({
            "edit_open" : true
        })

    },

    save : function() {

        this.props.on_save(this.props, this.state);

        this.setState({
            "edit_open" : false
        })

    },

    cancel : function() {

        var new_state = {
            edit_open : false
        };

        if (this.state.prev_value)
        {
            new_state.value = this.state.prev_value;
            new_state.value_key = this.state.prev_value_key;
        }

        this.setState(new_state)

    },

    render : function() {

        var value_style = {};
        var input_style = {};
        var save_block_style = {};
        var edit_button_style = {};
        var row_style = {};

        if (this.state.edit_open)
        {
            value_style.display = "none";
            input_style.display = "inline-block";
            save_block_style.display = "inline-block";
            edit_button_style.display = "none";
        }
        else
        {
            value_style.display = "inline-block";
            input_style.display = "none";
            save_block_style.display = "none";
            //edit_button_style.display = "inline-block";
            row_style.cursor = "pointer";
        }

        if (Array.isArray(this.props.options_values))
        {

            var valueLink = {
                value: this.state.value_key,
                requestChange: this.handleValueChange
            }

            //var input_value = (<select>);
/*
            for (var i = 0; i < 10; i++)
            {
                console.log('>>> ', i);
            }*/

            var options = [];

            //for (var i = 0; i < this.props.options_values.length; i++)
            for (var key in this.props.options_values)
            {
                options.push({
                    "key" : key,
                    "label" : this.props.options_values[key]
                })
                //options.push(<option value={key}>{value}</option>);
                //options.push(<option value={this.props.options_values[i].key}>{this.props.options_values[i].value}</option>);
            }

            //input_value += (</select>);

            //var input_value = <select style={input_style} valueLink={valueLink}>{options}</select>;

            var input_value = <SimpleSelectBlock
                                  selectors={options}
                                  onChange={this.handleValueChange}
                                  style={input_style}
                                  active_selector_key={this.props.value}
                              />

        }
        else
        {

            var valueLink = {
                value : this.state.value,
                requestChange : this.handleValueChange
            }

            var input_value = <input style={input_style} valueLink={valueLink} type="text"/>;
        }

        // value={this.props.value}

        return (
            <span className="row" onClick={this.edit_click} style={row_style}>
                <span className="key">{this.props.value_key}</span>
                <span className="value" style={value_style}>{this.state.value}</span>
                {input_value}
                <span style={edit_button_style} className="edit">edit</span>
                <span className="save_block" style={save_block_style}><span className="save" onClick={this.save}>Save</span><span className="cancel" onClick={this.cancel}></span></span>
            </span>
        );
    }
})
