<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginForm from '@/components/UserLogin/LoginForm.vue'
import RegisterForm from '@/components/UserLogin/RegisterForm.vue'
</script>

<template>
	<div class="view-container">
		<div class="fixed right-0 top-0 -z-10 h-screen img">
			<img src="@/assets/library.jpg" alt="Login" class="w-full h-full object-cover" />
		</div>

		<div class="flex overflow-hidden">
			<!-- Left side with tabs -->
			<div class="flex-1 flex">
				<Tabs default-value="login" class="w-full md:w-[400px]">
					<TabsList>
						<TabsTrigger value="login"> Đăng nhập </TabsTrigger>
						<TabsTrigger value="register"> Đăng ký </TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<LoginForm />
					</TabsContent>
					<TabsContent value="register">
						<RegisterForm />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	</div>
</template>

<style scoped>
.img {
	@apply overflow-hidden w-full md:w-1/3 lg:w-1/2 md:brightness-100 md:opacity-100 brightness-50 opacity-20;
}
</style>
