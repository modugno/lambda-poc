const withStyles = theme => ({
	wrapper: {
		padding: 40,
		background: theme.colors.primary,
		textAlign: "center"
	},
	title: {
		font: {
			size: 40,
			weight: 900
		},
		color: "#24292e"
	},
	link: {
		color: "#24292e",
		"&:hover": {
			opacity: 0.5
		}
	}
})

module.exports = withStyles
