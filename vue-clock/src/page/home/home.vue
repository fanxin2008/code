<template>
	<div>
		<head-top singin-up='home'>
			<span>home</span>
		</head-top>
	</div>
</template>
<script>
import headTop from '../../components/header/head'

export default {
	data() {
		return{}
		},
	mounted(){},
	compontents:{
		headTop
	},
	computed:{
	},
	methods:{
		reload(){
			window.location.reload();
		}
	}
}
</script>

